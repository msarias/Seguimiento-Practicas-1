const Usuarios = require("../Models/Usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const transporter = require("../Config/nodemailer");
require("dotenv").config();

//Generar token y enviar correo
exports.forgotPassword = async (req, res) =>{
    try{
        const {email} = req.body;
        const usuario = await Usuarios.findOne({where:{email}});

        if(!usuario){
            return res.status(404).json({message :"Usuario no encontrado"});
        }
        //genera token con tiempo de expiracion
        const token = jwt.sign({id :usuario.id}, process.env.JWT_SECRET,{
            expiresIn: "1h",
        });
        //enlace para restablecer
        const resetLink = `http://localhost:3000/reset-password/${token}`;

        //configuracion correo
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: usuario.email,
            subject : "Restablecer contraseña",
            html: `
            <h2>Solicitud de restablecimiento de contraseña</h2>
            <p>Haz click en el enlace para restablecer su contraseña</p>
            <a href="${resetLink}">${resetLink}</a>
            <p>Si no solicitaste este cambio, ignora este mensaje.</p>
            `,
        };
        await transporter.sendMail(mailOptions);

        res.json({message: "Correo enviado, revisa tu bandeja"});
    }catch(error){
        res.status(500).json({error:"Error al enviar el correo"});
    }
};

//Resablecer contraseña

exports.resetPassword = async (req, res) =>{
    try{
        const {token} = req.params;
        const {newPassword} = req.body;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const usuario = await Usuarios.findByPk(decoded.id);

        if(!usuario){
            return res.status(400).json({message:"Token inválido o expirado"});
        }

        //cifrar nuebva contraseña
        usuario.password = await bcrypt.hash(newPassword, 10);
        await usuario.save();

        res.json({message: "Contraseña actualizada correctamente"});
    }catch(error){
        res.status(500).json({error:"Error al restablecer la contraseña"});
    }
};