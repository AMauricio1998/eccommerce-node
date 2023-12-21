import jwt from 'jsonwebtoken';

const generarJWT = (id, idRole) => { 
    return jwt.sign({ id, idRole }, process.env.SECRET_KEY, { 
        expiresIn: '4h' 
    });
}
export default generarJWT;