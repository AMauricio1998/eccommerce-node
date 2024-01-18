import { Sequelize, DataTypes } from "sequelize";
import conectarDB from '../config/db.js';
import Brands from "./Brands.js";
import Products from "./Products.js";

const HomeGoodsProducts = conectarDB.define('home_goods_products', {
    product_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
            model: 'Products',
            key: 'id'
        }
    },
    id_brand: {
        type: DataTypes.UUID,
        references: {
            model: 'Brands',
            key: 'id'
        }
    },
    size: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El tamaño es obligatorio'
            }
        },
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El color es obligatorio'
            },
            len: {
                args: [3, 60],
                msg: 'El color debe tener entre 3 y 60 caracteres'
            }
        }
    },
    material: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El material es obligatorio'
            },
        }
    },
    weight: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El peso es obligatorio'
            },
        }
    },
    dimensions: {
        type: DataTypes.STRING,
        allowNull: true, 
    }
}, {
    timestamps: true,
});

HomeGoodsProducts.belongsTo(Brands, { foreignKey: 'id_brand', as: 'brand', onDelete: 'CASCADE' });

export default HomeGoodsProducts;