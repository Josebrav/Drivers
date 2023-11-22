const axios = require('axios')


const getDriverByWord = async (req,res) =>{
    try {
        const { word } = req.query;

        const { data } = await axios.get(`http://localhost:5000/drivers/name?=${word}`);

        if (!data.id) throw new Error("Not found!"); //controlador pendiente

        return res.status(200).json(data);

    } catch (error) {

        res.status(500).send(error.message);

    }

}

module.exports= {getDriverByWord}