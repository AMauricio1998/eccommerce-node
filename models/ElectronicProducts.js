import { Sequelize, DataTypes } from "sequelize";
import conectarDB from '../config/db.js';
import Brands from "./Brands.js";

const ElectronicProducts = conectarDB.define('electronic_products', {
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
    model: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El modelo es obligatorio'
            },
            len: {
                args: [3, 60],
                msg: 'El modelo debe tener entre 3 y 60 caracteres'
            }
        }
    },
    processor: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El procesador es obligatorio'
            },
            len: {
                args: [3, 60],
                msg: 'El procesador debe tener entre 3 y 60 caracteres'
            }
        }
    },
    ram: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'La memoria RAM es obligatoria'
            },
            len: {
                args: [3, 60],
                msg: 'La memoria RAM debe tener entre 3 y 60 caracteres'
            }
        }
    },
    storage: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El almacenamiento es obligatorio'
            },
            isNumeric: {
                msg: 'El almacenamiento debe ser un número'
            }
        }
    },
    operatingSystem: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: {
                msg: 'El sistema operativo es obligatorio'
            },
            len: {
                args: [3, 60],
                msg: 'El sistema operativo debe tener entre 3 y 60 caracteres'
            }
        }
    },
    screenSize: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
            notEmpty: {
                msg: 'El tamaño de pantalla es obligatorio'
            },
            isNumeric: {
                msg: 'El tamaño de pantalla debe ser un número'
            }
        }
    },
    resolution: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: {
                msg: 'La resolución es obligatoria'
            },
            len: {
                args: [3, 60],
                msg: 'La resolución debe tener entre 3 y 60 caracteres'
            }
        }
    },
    batteryLife: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: {
                msg: 'La duración de la batería es obligatoria'
            },
            len: {
                args: [3, 60],
                msg: 'La duración de la batería debe tener entre 3 y 60 caracteres'
            }
        }
    },
    connectivity: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: {
                msg: 'La conectividad es obligatoria'
            },
            len: {
                args: [3, 60],
                msg: 'La conectividad debe tener entre 3 y 60 caracteres'
            }
        }
    },
    color: {
        type: DataTypes.STRING,
        allowNull: true,
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
}, {
    timestamps: true,
});

ElectronicProducts.belongsTo(Brands, { foreignKey: 'id_brand', as: 'brand', onDelete: 'CASCADE' });

export default ElectronicProducts;