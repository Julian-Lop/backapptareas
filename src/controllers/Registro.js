require('dotenv').config()
const { Usuarios } = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { JWT_SECRET } = process.env

const validPassword = async (clave, usuario) => {
    return await bcrypt.compareSync(clave, usuario.Clave)
}

exports.registro = async (req,res) => {
    const {Nombre,Email,Clave} = req.body
    try {
        if(Nombre && Email && Clave){
            let user = await Usuarios.create({
                Nombre,
                Email,
                Clave
            })
            if(user){
                return res.status(201).json({message: 'Registrado con exito', creado:true})
            }else{
                return res.status(400).json({message: 'Registrado fallido', creado:false})
            }
        }else{
            return res.status(200).json({message: 'Hay campos vacios', creado:false})
        }
    } catch (error) {
        if(Email && Nombre && Clave){
            return res.status(200).json({message: 'El Email ya ha sido utilizado', creado:false})
        }
    }
}