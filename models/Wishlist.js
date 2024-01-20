import { Sequelize, DataTypes  } from "sequelize";
import conectarDB from '../config/db.js';
import Products from "./Products.js";
import Users from "./Users.js";

const Wishlist = conectarDB.define('wishlists', {
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
}, {
    timestamps: true,
    freezeTableName: true
});

export default Wishlist;