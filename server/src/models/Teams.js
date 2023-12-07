const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('Teams', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allownull: false
        }
    }, { timesTamps: false }
    )
}