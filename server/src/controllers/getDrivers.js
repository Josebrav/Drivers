const axios = require("axios");
const {Driver,Teams} = require('../db')


const getDrivers = async (req, res) => {
  try {

    const { data } = await axios.get(`http://localhost:5000/drivers`);

    const driversDB = await Driver.findAll({
      include: [
        {
          model: Teams,
          as: "Teams",
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    });
    const driversDBArray = Object.values(driversDB)
    

    const driversMap = driversDBArray.map((driver) => {
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
    

    const driversImg = data.map((driv) => {
      if (driv.image.url == "" && driv.image.imageby == "") {
        driv.image.url = "https://1000marcas.net/wp-content/uploads/2020/01/logo-F1.png";
        driv.image.imageby = "defect"
      }
      return driv;
    })

    if (!data.length) throw new Error("No hay drivers!");

    const totalDrivers = [...driversMap,...driversImg]


    return res.status(200).json(totalDrivers);

  } catch (error) {
    res.status(500).send(error.message);
  }
};


module.exports = { getDrivers }