
const express = require('express')
const router = express.Router()
const signupFile = require('./signup')
const loginFile = require('./login')
const changePasswordFile = require('./changePassword')

const {
	body
} = require('express-validator')

const cusValid = require('../helper/custom_validators')
const vMsg = require('../helper/validation_message')

const regxPwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[?@#_=$:\-.])(?=.{10,})/

router.post('/signup',
    signupFile.checkExistingUsername,
    signupFile.signup
)

router.post('/login',
    cusValid.validate([
        body('username')
			.not().isEmpty().withMessage(vMsg.required),
        body('password')
			.not().isEmpty().withMessage(vMsg.required)
    ]),
    loginFile.userLogin
)

router.post('/change/password',
    cusValid.authTokenValidate,
    cusValid.validate([
        body('username')
			.not().isEmpty().withMessage(vMsg.required),
        body('currentPassword')
			.not().isEmpty().withMessage(vMsg.required),
	 	body('newPassword')
			.not().isEmpty().withMessage(vMsg.required)
    ]),
    changePasswordFile.changePassword
)

router.get('/list',
    cusValid.authTokenValidate,
    loginFile.getUserList
)


module.exports = router
