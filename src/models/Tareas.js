const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('Tareas', {
        Titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Descripcion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        FechaIni: {
            type: DataTypes.DATE,
            allowNull: true
        },
        FechaFin: {
            type: DataTypes.DATE,
            allowNull: true
        }
    })
}