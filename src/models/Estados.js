const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('Estados',{
        Nombre: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}