import Sequelize from "../../config/db.js";
import Departments from "../../models/Departments.js";

export const getDepartments = async (req, res) => {
    try {        
        const departments = await Departments.findAll();
    
        res.json({
            departments
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Ocurrio un error al obtener los departamentos'
        });
    }
}

//crear un departamento
export const createDepartment = async (req, res) => {
    const transaction = await Sequelize.transaction();
    try {
        const { name, slug } = req.body;
        const department = await Departments.create({ 
            name, slug
        }, {
            fields: ['name', 'slug'],
            transaction
        });

        await transaction.commit();

        res.json({
            msg: 'Departamento creado correctamente',
            department
        });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({
            msg: 'Ocurrio un error al crear el departamento'
        });
    }
}