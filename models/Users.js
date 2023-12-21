import { Sequelize, DataTypes  } from "sequelize";
import bcrypt from 'bcrypt'
import conectarDB from '../config/db.js';

const Users = conectarDB.define('users', {
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
            }
        }
    },
    surname: {
        type: DataTypes.STRING(60),
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: 'Debe ser un correo electrónico válido'
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [6, 128],
                msg: 'La contraseña debe tener entre 6 y 128 caracteres'
            }
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    roleId: {
        type: DataTypes.UUID,
        references: {
            model: 'Roles', // nombre de la tabla de roles
            key: 'id'
        }
    },
    token: {
        type: DataTypes.STRING(64),
        allowNull: true,
    },
    confirmed: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    hooks: {
        beforeCreate: async (user) => {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        },
    }
});

Users.prototype.verificarPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

export default Users;