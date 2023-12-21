import { Sequelize } from 'sequelize';

const conectarDB = new Sequelize('ecommerce', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
        acquire: 30000
    },
    logging: false
});

export default conectarDB;