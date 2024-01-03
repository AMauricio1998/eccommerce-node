import { Sequelize, DataTypes  } from "sequelize";
import conectarDB from '../config/db.js';

const UserAddress = conectarDB.define('user_address', {
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
    id_user: {
        type: DataTypes.UUID,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    state: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El estado es obligatorio'
            }
        }
    },
    locality: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'La localidad es obligatoria'
            }
        }
    },
    street: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'La calle es obligatoria'
            }
        }
    },
    number: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El numero es obligatorio'
            }
        }
    },
    cp: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El codigo postal es obligatorio'
            },
            is: {
                args: /^[0-9]{5}$/,
                msg: 'El codigo postal debe tener 5 digitos'
            }
        }
    },
    references: {
        type: DataTypes.STRING(60),
        allowNull: true,
    },
    default: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
},{
    timestamps: true,
});

export default UserAddress;