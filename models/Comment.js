import { Sequelize, DataTypes  } from "sequelize";
import conectarDB from '../config/db.js';
import Products from "./Products.js";
import Users from "./Users.js";

const Comment = conectarDB.define('comments', {
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    product_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id'
        }
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El comentario es obligatorio'
            }
        }
    },
}, {
    timestamps: true,
});

export default Comment;