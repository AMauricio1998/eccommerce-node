import nodemailer from 'nodemailer';

export const registerEmail = async (data) => {
    const { email, name, token } = data;

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
    });

    const info = await transport.sendMail({
        from: '"Ecommerce - Los mejores productos " <ecommerce@gmail.com>',
        to: email,
        subject: 'Confirma tu cuenta',
        text: 'Confirma tu cuenta en Ecommerce',
        html: `
            <p style="font-weight: 800; color: #000000;">Hola ${name} Comprueba tu cuenta</p>

            <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace:

            <a href="${process.env.FRONTEND_URL}/confirm-account/${token}">Comprobar Cuenta</a>
    
            <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
        `,
    });
};

export const emailRememberPassword = async (data) => {
    const { email, name, token } = data;

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
    });

    const info = await transport.sendMail({
        from: '"Ecommerce - Los mejores productos "',
        to: email,
        subject: 'Recuperar contraseña',
        text: 'Recuperar contraseña',
        html: `
            <p style="font-weight: 800; color: #000000;">Hola ${name} Recupera tu contraseña</p>

            <p>Recupera tu contraseña en el siguiente enlace:

            <a href="${process.env.FRONTEND_URL}/remember-password/${token}">Recuperar contraseña</a>
    
            <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
        `,
    })
}