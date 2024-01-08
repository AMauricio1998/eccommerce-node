import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import admin from 'firebase-admin';
import loger from 'morgan';
import connectDB from './config/db.js';
import RolesRoute from './routes/RolesRoutes.js';
import UserRoutes from './routes/UserRoutes.js';
import UserAddressRoutes from './routes/UserAddressRoutes.js';
import BrandsRoutes from './routes/BrandsRoutes.js';
import CategoriesRoutes from './routes/CategoriesRoutes.js';

//modelos 
import Departments from './models/Departments.js';
import Brands from './models/Brands.js';
import Roles from './models/Roles.js';
import Users from './models/Users.js';
import UserAddress from './models/UserAddress.js';
import Categories from './models/Categories.js';

admin.initializeApp({
    creadential: admin.credential.cert('./serviceAccountKey.json'),
})

connectDB.sync()
    .then(() => console.log('DB conectada'))
    .catch((error) => console.log(error));

const app = express();

app.use(loger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();

app.use("/api/roles", RolesRoute);
app.use("/api/users", UserRoutes);
app.use("/api/users/address", UserAddressRoutes);
app.use('/api/brands', BrandsRoutes);
app.use('/api/categories', CategoriesRoutes);

const PORT = process.env.PORT || 4000;

app.listen(4000, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
})