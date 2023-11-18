const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('Team',{
        id:{},
        nombre:{}
    },{
        timesTamps: false
    })
}