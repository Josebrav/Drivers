const { Router } = require('express');
const { getDrivers } = require('../controllers/getDrivers');
const { getDriverById } = require('../controllers/getDriverById');
const { getDriverByWord } = require('../controllers/getDriverByWord');
const { postDriver } = require('../controllers/postDriver');
const { getTeams } = require('../controllers/getTeams');

const router = Router();

router.get('/drivers', getDrivers)

router.get('/drivers/:id', getDriverById)

router.get('/drivers/name?=', getDriverByWord) //recibe nombre despues de =... :name

router.post('/drivers', postDriver)

router.get('/teams', getTeams)



module.exports = router;
