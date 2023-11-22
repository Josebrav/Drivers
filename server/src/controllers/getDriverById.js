const axios = require('axios')


const getDriverById = async (req, res) => {

    try {
        const { id } = req.params;

        const { data } = await axios.get(`http://localhost:5000/drivers/${id}`);

        if (!data.id) throw new Error("Not found!");

        const driver = {
            id: data.id,
            driverRef: data.driverRef,
            number: data.number,
            nationality: data.nationality,
            teams: data.teams,
            description: data.description,
            image: data.image.url
        };

        return res.status(200).json(driver);

    } catch (error) {

        res.status(500).send(error.message); //responde con un mensaje 404

    }
}
module.exports = { getDriverById };