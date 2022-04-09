const { DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')

module.exports = (sequelize) => {
    sequelize.define('Usuarios', {
        Nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        Clave: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        hooks: {
            beforeCreate: async (Usuarios) => {
                if(Usuarios.Clave){
                    const salt = await bcrypt.genSaltSync(10, 'a')
                    Usuarios.Clave = bcrypt.hashSync(Usuarios.Clave, salt)
                }
            },
            beforeUpdate: async (Usuarios) => {
                if(Usuarios.Clave){
                    const salt = await bcrypt.genSaltSync(10, 'a')
                    Usuarios.Clave = bcrypt.hashSync(Usuarios.Clave, salt)
                }
            }
        }
    })
}