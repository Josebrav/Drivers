const { Model } = require('sequelize');
const { Driver, Teams } = require('../db');
const {Op} = require('sequelize')

const postDriver = async (req, res) => {
    try {
        
        const { forename, surname, image, description, dob, nationality, teams } = req.body;
        

        if (!forename || !surname || !description || !image || !dob || !nationality ) {
            return res.status(400).send("Faltan datos");
        }

        const newDriver = await Driver.create({
            forename,
            surname,
            image,
            description,
            nationality,
            dob
          });
          if (teams && teams.length > 0) {
            const searchTeam = await Teams.findAll({
              where: { name: { [Op.in]: teams } },
            });
             await newDriver.addTeams(searchTeam);
        }
        return res.status(200).json(newDriver);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = { postDriver };