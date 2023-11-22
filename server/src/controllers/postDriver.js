const { Driver } = require('../db')


const postDriver = async (req, res) => {
    try {
        const { id, name, apellido, image, description, dob, nationality } = req.body;

        if (!id || !name || !apellido || !description || !image || !dob || !nationality ) {
            res.status(401).send("Faltan datos")
        }
        const newDriver = await Driver.findOrCreate({
            where: {
                id,
                name,
                apellido,
                description,
                image,
                dob,
                nationality
            }
        })
        return res.status(200).json(newDriver);

    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = { postDriver }