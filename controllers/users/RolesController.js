import Roles from '../../models/Roles.js';

// Obtener todos los roles
export const getRoles = async (req, res) => {
    try {
        const roles = await Roles.findAll();
        res.json({
            data: roles
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error interno del servidor'
        });
    }
}

// Obtener un rol
export const getRol = async (req, res) => {
    const { id } = req.params;
    try {
        const rol = await Roles.findOne({ where: { id } });
        
        res.json({
            data: rol
        });
    } catch (error) {
        res.status(500).json({ msg: error.errors[0].message });
    }
}

//Nuevo rol
export const nuevoRol = async (req, res) => {
    const { name } = req.body;
    try {
        const rol = await Roles.create({ name }, { fields: ['name'] });

        res.json({
            msg: 'Rol creado correctamente',
            data: rol
        });
    } catch (error) {
        res.status(500).json({ msg: error.errors[0].message });
    }
}

// Actualizar rol
export const actualizarRol = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const rol = await Roles.findOne({ where: { id } });

        if (!rol) res.status(404).json({ msg: 'Rol no encontrado' });

        await rol.update({ name }, { where: { id } });

        res.json({
            msg: 'Rol actualizado correctamente',
            data: rol
        }); 
    } catch (error) {
        res.status(500).json({ msg: error.errors[0].message });
    }
}