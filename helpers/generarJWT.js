import jwt from 'jsonwebtoken';

const generarJWT = (id, idRole) => { 
    return jwt.sign({ id, idRole }, process.env.SECRET_KEY, { 
        expiresIn: '24h' 
    });
}
export default generarJWT;