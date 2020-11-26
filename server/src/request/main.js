
const express = require('express')
const router = express.Router()
const requestFile = require('./request')

const {
	body
} = require('express-validator')

const cusValid = require('../helper/custom_validators')
const vMsg = require('../helper/validation_message')

const regxPwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[?@#_=$:\-.])(?=.{10,})/

router.get('/get', cusValid.authTokenValidate, requestFile.get)
router.post('/getById', cusValid.authTokenValidate, requestFile.getById)

router.post('/post', cusValid.authTokenValidate, requestFile.uploadMulter, requestFile.upload, requestFile.post)
router.put('/put', cusValid.authTokenValidate, requestFile.uploadMulter, requestFile.upload, requestFile.put)
router.delete('/delete', cusValid.authTokenValidate, requestFile.delete)
router.post('/changeStatus', cusValid.authTokenValidate, requestFile.changeRequestStatus)

module.exports = router
