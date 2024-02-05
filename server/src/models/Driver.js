const { DataTypes } = require('sequelize');



module.exports = (sequelize) => {
  
  sequelize.define('Driver', {
    id: {
      type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
    },
    forename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nationality: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATE,
      allowNull:false
    },
    created: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    
  },
    { timesTamps: false });
};