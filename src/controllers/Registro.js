require('dotenv').config()
const { Usuarios } = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const res = require('express/lib/response')
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

exports.ingresar = async (req,res) => {
    const {Email,Clave} = req.body
    try {
        const user = await Usuarios.findOne({where:{Email:Email}})
        
        if(!user) return res.status(202).json({message: 'el usuario no existe', auth:false})
        
        let valid = await validPassword(Clave,user)

        if(valid){
            const token = jwt.sign({
                name: user.Nombre,
                email: user.Email
            }, JWT_SECRET, {expiresIn: '24h'})
            return res.status(200).json({message:'logueado exitosamente', auth:true, token:token})
        }else{
            return res.status(200).json({message:'Email o Clave incorrecta', auth:false})
        }
    } catch (error) {
        return res.status(500).json({message:error, auth:false})
    }
}

exports.sesion = async (req,res) => {
    const token = req.headers['x-access-token']
    try {
        const decodificado = jwt.verify(token, JWT_SECRET)
        const email = decodificado.email
        const user = await Usuarios.findOne({
            where:{
                Email:email
            },
            attributes : ['id','Nombre']
        })
        return res.status(200).json({status: 'ok', sesion:user})
    } catch (error) {
        res.status(200).json({status: 'error', error: 'token invalido'})
    }
}