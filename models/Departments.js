import { Sequelize, DataTypes  } from "sequelize";
import conectarDB from '../config/db.js';

const Departments = conectarDB.define('departments', {
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
    img: {
        type: DataTypes.STRING(60),
        allowNull: true,
    },
    entry: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    meta_title: {
        type: DataTypes.STRING(60),
        allowNull: true,
    },
    meta_description: {
        type: DataTypes.STRING(60),
        allowNull: true,
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
}, {
    timestamps: true,
});

export default Departments;