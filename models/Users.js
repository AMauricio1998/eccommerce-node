import { Sequelize, DataTypes  } from "sequelize";
import bcrypt from 'bcrypt'
import conectarDB from '../config/db.js';
import Roles from "./Roles.js";
import UserAddress from "./UserAddress.js";

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
        unique: {
            args: true,
            msg: 'El correo electrónico ya está registrado'
        },
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
            is: {
                args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-])[A-Za-z\d#?!@$%^&*-]{8,}$/,
                msg: 'La contraseña debe tener minimo 8 caracteres, una mayuscula, una minuscula, un numero y un caracter especial'
            }
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    id_role: {
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
}, {
    hooks: {
        beforeCreate: async (user) => {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        },
    },
    timestamps: true,
});

Users.prototype.verificarPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

Users.belongsTo(Roles, { foreignKey: 'id_role', as: 'role' });
Users.hasMany(UserAddress, { as: 'address', foreignKey: 'id_user' });

export default Users;