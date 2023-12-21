import Users from "../models/Users.js";

// Obtener todos los usuarios
export const getUsers = async (req, res, next) => {
    try {
        const users = await Users.findAll();
        
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
    const { name, email, password, roleId } = req.body;
    try {
        const user = await Users.create({ 
            name, 
            email, 
            password 
        }, { 
            fields: [
                'name', 
                'email', 
                'password' 
            ] 
        });

        res.json({
            msg: 'Usuario creado correctamente',
            data: user
        });
    } catch (error) {
        res.status(500).json({ msg: error.errors[0].message });
    }
}

// Autenticar un usuario
export const authUser = async (req, res, next) => {
    const { email, password } = req.body;

    // comprobar si el usuario existe
    const usuario = await Users.findOne({ where: { email } });
    if(!usuario) {
        const error = new Error('El usuario no existe');
        return res.status(404).json({ msg: error.message });
    }

    // comprobar si el usuario esta confirmado
    if(!usuario.confirmed) {
        const error = new Error('El usuario no esta confirmado');
        return res.status(401).json({ msg: error.message });
    }
}