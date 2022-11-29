import nodemailer from "nodemailer"

export const emailRegistro = async (datos) => {
    const {email, nombre, token } = datos;
    // TODO: mover-hacia-variables-de-entorno
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const info = await transport.sendMail({
        from: '"UpTask - Administrador de Poryectos" <cuentas@uptaks.com>',
        to: email,
        subject: "Uptask- Comprueba tu cuenta",
        text: "Comprueba tu cuenta en Uptask",
        html: `<p> Hola: ${nombre} Comprueba tu cuenta en upTask</p>
        <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguien enlace: </p>

        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta </a>

        <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>

        
        `,
      })
}

export const emailOlvidePassword = async (datos) => {
  const {email, nombre, token } = datos;
  // TODO: mover-hacia-variables-de-entorno
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    });

    const info = await transport.sendMail({
      from: '"UpTask - Administrador de Proyectos" <cuentas@uptaks.com>',
      to: email,
      subject: "Uptask- Restablece tu password",
      text: "Restablece tu password",
      html: `<p> Hola: ${nombre} has solicitado restablecer tu password</p>
      <p>Sigue el siguiente enlace para generar uno nuevo: </p>

      <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Restablecer Password</a>

      <p>Si tu no solicitaste una nueva contraseña, puedes ignorar el mensaje</p>

      
      `,
    })
}