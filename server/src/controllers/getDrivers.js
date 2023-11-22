const axios = require("axios")


const getDrivers = async (req, res) => {
  try {

    const { data } = await axios.get(`http://localhost:5000/drivers`);

    const dataImg = data.map((driv) => {
      if (driv.image.url == "" && driv.image.imageby == "") {
        driv.image.url = "https://1000marcas.net/wp-content/uploads/2020/01/logo-F1.png";
        driv.image.imageby = "defect"
      }
      return driv;
    })

    if (!data.length) throw new Error("No hay drivers!")


    return res.status(200).json(dataImg);

  } catch (error) {
    res.status(500).send(error.message);
  }
};


module.exports = { getDrivers }