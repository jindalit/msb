

const express = require('express')
const router = express.Router()
const config = require('../config/main')


router.use((req, res, next) => {
	res.status(200);
	next();
})

const userFile = require('./user/main')
router.use('/user', userFile)

const requestFile = require('./request/main')
router.use('/request', requestFile)

const categorytFile = require('./category/main')
router.use('/category', categorytFile)

const roleFile = require('./role/main')
router.use('/role', roleFile)

const statusFile = require('./status/main')
router.use('/status', statusFile)

const projectFile = require('./project/main')
router.use('/project', projectFile)

const reqTypeFile = require('./reqtype/main')
router.use('/reqtype', reqTypeFile)

const reqcatmapFile = require('./reqcatmap/main')
router.use('/req-cat-map', reqcatmapFile)

const tourFile = require('./tour/main')
router.use('/tour', tourFile)

const subFile = require('./subscribe/main')
router.use('/subscribe', subFile)

const trainingFile = require('./training/main')
router.use('/training', trainingFile) 

const userTrainMapFile = require('./usertrainmap/main')
router.use('/user/training', userTrainMapFile) 

const eqpFile = require('./equipment/main')
router.use('/equipment', eqpFile)

const sevFile = require('./severity/main')
router.use('/severity', sevFile)

const cactFile = require('./caction/main')
router.use('/action', cactFile)
const incidentFile = require('./incident/main')
router.use('/incident', incidentFile)

module.exports = router
