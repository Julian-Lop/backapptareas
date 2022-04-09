const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('Subtareas', {
        Titulo:{
            type : DataTypes.STRING,
            allowNull: false
        },
        Descripcion: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}