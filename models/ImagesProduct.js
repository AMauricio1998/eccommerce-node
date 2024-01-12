import { Sequelize, DataTypes  } from "sequelize";
import conectarDB from '../config/db.js';

const ImagesProduct = conectarDB.define('images_product', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        unique: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
    },
    img: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'La imagen es obligatoria'
            }
        }
    },
    id_product: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Products',
            key: 'id'
        }
    }
}, {
    timestamps: true,
});

export default ImagesProduct;