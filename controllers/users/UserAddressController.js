import Sequelize from "../../config/db.js";
import UserAddress from "../../models/UserAddress.js";


export const getAddress = async (req, res) => {
    const { id_user } = req.params;
    try {
        const address = await UserAddress.findAll({ where: { id_user } });
        
        res.json({
            data: address
        });
    } catch (error) {
        res.status(500).json({ msg: error.errors[0].message });
    }
}

export const newAddress = async (req, res) => {
    const transaction = await Sequelize.transaction();
    const { name, state, locality, street, number, cp, references } = req.body;
    const { id_user } = req.params;

    try {
        const address = await UserAddress.create({
            name,
            id_user,
            state,
            locality,
            street,
            number,
            cp,
            references
        }, {
            fields: [
                'name',
                'id_user',
                'state',
                'locality',
                'street',
                'number',
                'cp',
                'references'
            ],
            transaction
        });

        await transaction.commit();

        res.json({
            msg: 'Dirección creada correctamente',
            data: address
        });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ msg: error.errors[0].message });
    }
}

export const setDefaultAddress = async (req, res) => {
    const transaction = await Sequelize.transaction();
    const { id } = req.params;
    const { id_user } = req.body;

    try {
        // poner todas las direcciones del usuario en false
        await UserAddress.update({ 
            default: false 
        }, { 
            where: { id_user } 
        }, {
            transaction
        });
        // poner la direccion seleccionada en true
        await UserAddress.update(
            { 
                default: true
            }, { 
                where: { id } 
            }, {
                transaction
            });
        await transaction.commit();

        res.json({
            msg: 'Dirección predeterminada actualizada correctamente',
        })
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ msg: error.errors[0].message });
    }
}

export const deleteAddress = async (req, res) => {
    const { id } = req.params;

    try {
        const address = await UserAddress.destroy({ where: { id } });

        res.json({
            msg: 'Dirección eliminada correctamente',
            data: address
        });
    } catch (error) {
        res.status(500).json({ msg: error.errors[0].message });
    }
} 