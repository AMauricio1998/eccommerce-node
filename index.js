import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import RolesRoute from './routes/RolesRoutes.js';
import UserRoutes from './routes/UserRoutes.js';

//modelos 
import Roles from './models/Roles.js';
import Users from './models/Users.js';

connectDB.sync()
    .then(() => console.log('DB conectada'))
    .catch((error) => console.log(error));

const app = express();

app.use(express.json());

dotenv.config();

app.use("/api/roles", RolesRoute)
app.use("/api/users", UserRoutes)

const PORT = process.env.PORT || 4000;

app.listen(4000, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
})