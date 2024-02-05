const axios = require('axios');
const { Teams } = require('../db');

let teamsInitialized = false; 

const getTeams = async (req, res) => {
    try {
        if (!teamsInitialized) {
            const { data } = await axios.get(`http://localhost:5000/drivers`);

            const dataTeams = data.map((driv) => driv.teams).join(",").split(",");
            const dataTeamSinEsp = dataTeams.map((team) => team.trim());
            const setDataTeams = Array.from(new Set(dataTeamSinEsp));
            const teamsDataBase = setDataTeams.map(team => ({ name: team }));

            for (const teamData of teamsDataBase) {
                const existingTeam = await Teams.findOne({ where: { name: teamData.name } });
                if (!existingTeam) {
                    await Teams.create(teamData);
                }
            }

            teamsInitialized = true; 
        }

        const teams = await Teams.findAll();
        const teamNames = teams.map((team) => team.name);

        res.status(200).json(teamNames);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = { getTeams };