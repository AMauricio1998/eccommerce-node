import { Sequelize, DataTypes } from "sequelize";
import conectarDB from '../config/db.js';
import Departments from "./Departments.js";
import Categories from "./Categories.js";
import Brands from "./Brands.js";

const Product = {
    borrador: 'borrador',
    publicado: 'publicado'
};

const Products = conectarDB.define('products', {
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
    slug: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: {
            args: true,
            msg: 'El slug ya está registrado'
        },
    },
    description:{ 
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'La descripción es obligatoria'
            }
        }
    },
    image_default: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    price: {
        type: DataTypes.FLOAT(10, 2),
        allowNull: false,
        defaultValue: 0.00,
    },
    id_department: {
        type: DataTypes.UUID,
        references: {
            model: 'Departments',
            key: 'id'
        }
    },
    id_category: {
        type: DataTypes.UUID,
        references: {
            model: 'Categories',
            key: 'id'
        }
    },
    status: {
        type: DataTypes.ENUM(Product.borrador, Product.publicado),
        allowNull: false,
        defaultValue: Product.borrador,
    },
    in_discount: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    discount: {
        type: DataTypes.FLOAT(10, 2),
        allowNull: true,
        defaultValue: 0.00,
    },
    system_code: {
        type: DataTypes.STRING(60),
        allowNull: true,
        unique: {
            args: true,
            msg: 'El código ya está registrado'
        },
    },
    likes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    timestamps: true,
});

Products.belongsTo(Departments, { foreignKey: 'id_department', as: 'department', onDelete: 'CASCADE' });
Products.belongsTo(Categories, { foreignKey: 'id_category', as: 'category', onDelete: 'CASCADE' });

export default Products;