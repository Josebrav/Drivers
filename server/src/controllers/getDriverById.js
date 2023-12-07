const axios = require('axios');
const { Driver,Teams } = require('../db')



const getDriverById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isNaN(id)) {
           
            const { data } = await axios.get(`http://localhost:5000/drivers/${id}`);

            if (!data.id) {
                throw new Error("Not found!");
            }

            const driver = {
                id: data.id,
                forename: data.name.forename,
                surname:data.name.surname,
                driverRef: data.driverRef,
                number: data.number,
                nationality: data.nationality,
                teams: data.teams,
                description: data.description,
                image: data.image.url,
            };

            return res.status(200).json(driver);
        } else {
            
            const find = await Driver.findByPk(id , {
                include: [
                  {
                    model: Teams,
                    as: "Teams",
                    attributes: ["name"],
                    through: { attributes: [] },
                  },
                ],
              }
                );
        
              const foundId = 
                {
                  id: find.id,
                  forename: find.forename,
                  surname: find.surname,
                  description: find.description,
                  image: find.image,
                  nationality: find.nationality,
                  dob: find.dob,
                  teams: find.Teams.map((team)=>team.name).join(", "),
        
                }
        
        
              if (!find) {
                return res.status(404).json({ message: "Driver not found" });
              }
        
              return res.status(200).json(foundId);
            }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = { getDriverById };