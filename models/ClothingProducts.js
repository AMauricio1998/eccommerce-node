import { Sequelize, DataTypes } from "sequelize";
import conectarDB from '../config/db.js';
import Brands from "./Brands.js";
import Products from "./Products.js";

const ClothingProducts = conectarDB.define('clothing_products', {
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
        type: DataTypes.ENUM('XS', 'S', 'M', 'L', 'XL', 'XXL'),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El tamaño es obligatorio'
            }
        },        
    },
    color: {
        type: DataTypes.STRING(60),
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
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El material es obligatorio'
            },
            len: {
                args: [3, 60],
                msg: 'El material debe tener entre 3 y 60 caracteres'
            }
        }
    },
    gender: {
        type: DataTypes.ENUM('Hombre', 'Mujer', 'Unisex'),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El género es obligatorio'
            }
        }
    },
    style: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El estilo es obligatorio'
            },
            len: {
                args: [3, 60],
                msg: 'El estilo debe tener entre 3 y 60 caracteres'
            }
        }
    },
    pattern: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El patrón es obligatorio'
            },
            len: {
                args: [3, 60],
                msg: 'El patrón debe tener entre 3 y 60 caracteres'
            }
        }
    },
}, {
    timestamps: true,
});

ClothingProducts.belongsTo(Brands, { foreignKey: 'id_brand', as: 'brand', onDelete: 'CASCADE' });

export default ClothingProducts;