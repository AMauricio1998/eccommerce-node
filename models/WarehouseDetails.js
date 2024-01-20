import { Sequelize, DataTypes } from "sequelize";
import conectarDB from '../config/db.js';
import Products from "./Products.js";
import Warehouses from "./Warehouses.js";

const WarehousesDetail = conectarDB.define('warehouses_details', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        unique: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
    },
    id_warehouse: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
            model: 'warehouses',
            key: 'id'
        }
    },
    id_product: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id'
        }
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El stock es obligatorio'
            },
            isInt: {
                msg: 'El stock debe ser un número entero'
            }
        }
    },
    stock_min: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El stock mínimo es obligatorio'
            },
            isInt: {
                msg: 'El stock mínimo debe ser un número entero'
            }
        }
    },
}, {
    timestamps: true,
    freezeTableName: true
});

export default WarehousesDetail;