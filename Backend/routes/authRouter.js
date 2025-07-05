const express = require('express');
const {  setUsers ,Login, Logout, userTransferMoney, AccountCreate , AccountDetail, AccountDelete, DepositMoney, GetUser} = require('../controllers/authHandler');
const authRouter = express.Router();
const verify = require('../middleware/veryfy');
authRouter.post('/auth/signup',setUsers)
authRouter.post('/auth/login',Login)
authRouter.post('/account/create',verify,AccountCreate)
authRouter.delete('/account/delete',verify,AccountDelete)
authRouter.post('/account/deposit',verify,DepositMoney)
authRouter.get('/account/me',verify,AccountDetail)
authRouter.get('/auth/logout',Logout)
authRouter.get('/account/user-account',verify,GetUser)
authRouter.get('/auth/userTransactionMoney',verify,userTransferMoney)
module.exports ={authRouter};
