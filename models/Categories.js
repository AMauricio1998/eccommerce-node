import { Sequelize, DataTypes  } from "sequelize";
import conectarDB from '../config/db.js';
import Departments from "./Departments.js";

const Categories = conectarDB.define('categories', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        unique: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
    },
    name: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: {
            args: true,
            msg: 'La categoría ya está registrada'
        },
        validate: {
            notEmpty: {
                msg: 'El nombre es obligatorio'
            },
            len: {
                args: [3, 60],
                msg: 'El nombre debe tener entre 3 y 60 caracteres'
            }   
        }
    },
    slug: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: {
            args: true,
            msg: 'El slug ya está registrado'
        },
    },
    banner: {
        type: DataTypes.STRING(60),
        allowNull: true,
    },
    img: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    id_department: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Departments',
            key: 'id'
        }
    }
}, {
    timestamps: true,
});

Categories.belongsTo(Departments, { foreignKey: 'id_department', as: 'department', onDelete: 'CASCADE' });

export default Categories;