const axios = require('axios');
const { Driver, Teams } = require('../db');
const { Op } = require('sequelize');

const getDriverByName = async (req, res) => {
    try {
        const { name } = req.query;

        
        const driversDB = await Driver.findAll({
            where: {
                surname: {
                    [Op.iLike]: `%${name}%`,
                },
            },
            include: Teams,
        });
        const driversMap = driversDB.map((driver) => {
            return {
              id: driver.id,
              forename: driver.forename,
              surname: driver.surname,
              description: driver.description,
              image: driver.image,
              nationality: driver.nationality,
              dob: driver.dob,
              teams: driver.Teams.map((team)=>team.name).join(", "),
              created: true,
      
            }
          })

        
        const { data } = await axios.get("http://localhost:5000/drivers");
        const nameString = name.toLowerCase();
        const filtradosAPI = data.filter((driv) => driv.name.surname.toLowerCase().includes(nameString) );

        
        const allDrivers = [...driversMap, ...filtradosAPI];

        if (!allDrivers.length) {
            throw new Error("Not found!");
        }

        
        const top15Drivers = allDrivers.slice(0, 15);

        return res.status(200).json(top15Drivers);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = { getDriverByName };