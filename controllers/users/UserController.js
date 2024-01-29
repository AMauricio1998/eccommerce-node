import bcrypt from "bcrypt";
import Users from "../../models/Users.js";
import generarJWT from "../../helpers/generarJWT.js";
import generarId from "../../helpers/generarId.js";
import { emailRememberPassword, registerEmail } from "../../helpers/email.js";
import Sequelize from "../../config/db.js";
import UserAddress from "../../models/UserAddress.js";
import Roles from "../../models/Roles.js";

// Obtener todos los usuarios
export const getUsers = async (req, res, next) => {
    try {
        const users = await Users.findAll({ include: 'role' });
        
        res.json({
            data: users
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error interno del servidor'
        });
    }
}

// Registrar un usuario
export const registerUser = async (req, res, next) => {
    const { name, email, password, id_role } = req.body;
    const transaction = await Sequelize.transaction();
    try {
        const user = await Users.create({ 
            name, 
            email, 
            password,
            token: generarId(),
        }, { 
            fields: [
                'name', 
                'email', 
                'password',
                'token'
            ],
            transaction
        });

        registerEmail({
            email: user.email,
            name: user.name,
            token: user.token
        });

        await transaction.commit();

        res.json({
            msg: 'Usuario creado correctamente',
            data: user
        });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ msg: error.errors[0].message });
    }
}

// Autenticar un usuario
export const authUser = async (req, res, next) => {
    const { email, password } = req.body;

    // comprobar si el usuario existe
    
    const usuario = await Users.findOne({ 
        where: { email }, 
        include: [
            { model: Roles, as: 'role'},
            { model: UserAddress, as: 'user_address' }
        ],
    });

    if(!usuario) {
        const error = new Error('El usuario no existe');
        return res.status(404).json({ msg: error.message });
    }

    // comprobar si el usuario esta confirmado
    if(!usuario.confirmed) {
        const error = new Error('El usuario no esta confirmado');
        return res.status(401).json({ msg: error.message });
    }

    // comprobar password
    if(await usuario.verificarPassword(password)) {
        // crear token
        res.json({
            id: usuario.id,
            name: usuario.name,
            surname: usuario.surname,
            email: usuario.email,
            phone: usuario.phone,
            token: generarJWT(usuario.id, usuario.role.name),
            user_address: usuario.user_address
        });
    } else {
        const error = new Error('Contraseña incorrecta');
        return res.status(401).json({ msg: error.message });
    }
}

export const confirmAccount = async (req, res, next) => {
    const { token } = req.params;
    const userConfirm = await Users.findOne({ where: { token } });
    const transaction = await Sequelize.transaction();

    if(!userConfirm) {
        const error = new Error('El usuario no existe');
        return res.status(404).json({ msg: error.message });
    }

    try {
        userConfirm.confirmed = true;
        userConfirm.token = "";
        await userConfirm.save({ transaction });
        await transaction.commit();

        res.json({
            msg: 'Usuario confirmado correctamente'
        });
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({ msg: error.message });
    }
}

// recuperar contraseña
export const rememberPassword = async (req, res) => {
    const { email } = req.body;
    const user = await Users.findOne({ where: { email } });
    const transaction = await Sequelize.transaction();

    if(!user) {
        const error = new Error('El usuario no existe');
        return res.status(404).json({ msg: error.message });
    }

    try {
        user.token = generarId();
        await user.save({
            transaction
        });

        emailRememberPassword({
            email: user.email,
            name: user.name,
            token: user.token
        });

        await transaction.commit();

        res.json({
            msg: 'Hemos enviado un correo para recuperar tu contraseña'
        });
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({ msg: error.message });
    }
}

export const checkToken = async (req, res) => {
    const { token } = req.params;
    const user = await Users.findOne({ where: { token } });

    if(user) {
        res.json({
            msg: 'Token valido y el usuario existe'
        });
    } else {
        const error = new Error('Token invalido');
        return res.status(404).json({ msg: error.message });
    }
}

export const newPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    const transaction = await Sequelize.transaction();

    const user = await Users.findOne({ where: { token } });

    if(user) {
        user.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        user.token = "";

        try {
            await user.save({
                transaction
            });

            await transaction.commit();
            res.json({
                msg: 'Contraseña actualizada correctamente'
            });
        } catch (error) {
            await transaction.rollback();
            res.status(500).json({ msg: error.errors[0].message });
        }
    } else {
        const error = new Error('Token invalido');
        return res.status(404).json({ msg: error.message });
    }
}

export const profileUser = async (req, res) => {
    try {
        const user = await Users.findOne({ 
            where: { id: req.user.id}, 
            include: [
                { model: Roles, as: 'role'},
                { model: UserAddress, as: 'user_address' }
            ],
        });
    
        res.json({ user })
    } catch (error) {
        console.log(error)
    }
}

// actualizar usuario
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, surname, phone } = req.body;
    const transaction = await Sequelize.transaction();

    try {
        const user = await Users.findOne({ 
            where: { id },
            include: [
                { model: Roles, as: 'role'},
                { model: UserAddress, as: 'user_address' }
            ],
        });

        if(!user) {
            const error = new Error('El usuario no existe');
            return res.status(404).json({ msg: error.message });
        }

        user.name = name;
        user.surname = surname;
        user.phone = phone;

        await user.save({
            transaction
        });

        await transaction.commit();

        res.json({
            msg: 'Usuario actualizado correctamente',
            data: user
        });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ msg: error.errors[0].message });
    }
}