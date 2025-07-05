const express = require('express');
const {transaction, getUserBalance, transferName} = require('../controllers/transaction');

const verify = require('../middleware/veryfy');
const transactionRoute = express.Router();

transactionRoute.get('/getUser',verify,transferName)
transactionRoute.post('/',verify ,transaction)
transactionRoute.get('/getUserBalance',verify ,getUserBalance)
module.exports ={transactionRoute};

