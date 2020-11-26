/**
 *  @Author - Vijay Sharma
 *  @AuthorEmail : sharmavijay393@gmail.com
 *  @CreatedDate : 2020-04-26
 *  @ModifiedDate : 
 */

const process = require('process')
require('dotenv').config()
let env = 'DEV' //DEV|QA|UAT|PROD

env = process.env.env ? process.env.env : env
let dbURL, jwtOptions, jwtSecret, port

switch (env) {
	case 'DEV':
		dbURL = 'mongodb://127.0.0.1:27017/msb'
		jwtOptions = { expiresIn: 60 * 60 * 24 }
		jwtSecret = 'dev@192!vj#'
		port = 3000
		break;
	case 'PROD':
		dbURL = ''
		jwtOptions = { expiresIn: 60 * 60 * 24 }
		jwtSecret = 'dev@192!vj#'
		port = 3000
		break;
	default:
		dbURL = 'mongodb://127.0.0.1:27017/msb'
		jwtOptions = { expiresIn: 60 * 60 * 24 }
		jwtSecret = 'dev@192!vj#'
		port = 3000
		break;
}

const config = {
	dbURL,
	jwtOptions,
	jwtSecret,
	port,
	version: {
		prod: 0,
		dev: 1
	},
};
module.exports = config
