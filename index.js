import express from 'express';
import cookieParser from "cookie-parser";
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
import DepartmentsRoutes from './routes/DepartmentsRoutes.js';
import ProductsRoutes from './routes/ProductsRoutes.js';

//modelos 
import Departments from './models/Departments.js';
import Brands from './models/Brands.js';
import Roles from './models/Roles.js';
import Users from './models/Users.js';
import Categories from './models/Categories.js';
import Products from './models/Products.js';
import ElectronicProducts from './models/ElectronicProducts.js';
import ClothingProducts from './models/ClothingProducts.js';
import HomeGoodsProducts from './models/HomeGoodsProducts.js';
import Warehouses from './models/Warehouses.js';
import WarehousesDetail from './models/WarehouseDetails.js';
import ImagesProduct from './models/ImagesProduct.js';
import Wishlist from './models/Wishlist.js';
import Comment from './models/Comment.js';
import UserAddress from './models/UserAddress.js';

admin.initializeApp({
    creadential: admin.credential.cert('./serviceAccountKey.json'),
})

connectDB.sync()
    .then(() => console.log('DB conectada'))
    .catch((error) => console.log(error));

const app = express();

app.use(cookieParser());

dotenv.config();

app.use(loger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Configurar cors
const whiteList = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: function(origin, callback) {
        if (whiteList.includes(origin)) {
            //Puede consultar la api
            callback(null, true);
        } else {
            callback(new Error("Error de Cors"))
        }
    },
    credentials: true
};

app.use(cors(corsOptions));

app.use("/api/roles", RolesRoute);
app.use("/api/users", UserRoutes);
app.use("/api/users/address", UserAddressRoutes);
app.use('/api/brands', BrandsRoutes);
app.use('/api/categories', CategoriesRoutes);
app.use('/api/departments', DepartmentsRoutes);
app.use('/api/products', ProductsRoutes);

const PORT = process.env.PORT || 4000;

app.listen(4000, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
})