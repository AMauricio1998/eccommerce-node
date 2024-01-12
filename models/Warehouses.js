import { Sequelize, DataTypes } from "sequelize";
import conectarDB from '../config/db.js';

const Warehouses = conectarDB.define('warehouses', {
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
    description:{ 
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            notEmpty: {
                msg: 'La descripción es obligatoria'
            }
        }
    },
}, {
    timestamps: true,
    freezeTableName: true
});

export default Warehouses;