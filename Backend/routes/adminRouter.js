// const express = require('express');
// const { EntryDetail } = require('../controllers/adminHandler');
// const adminRouter = express.Router();


// adminRouter.get('/MyUser',EntryDetail)


// module.exports ={adminRouter};

const express = require('express');
const { userLogin, getAllAccounts , getAllTransactions  , getUserTransactionsById, getAllUserTransactions, deleteAccountById, Logout} = require('../controllers/adminHandler');
const adminRouter = express.Router();
const verify = require('../middleware/veryfy');


adminRouter.get('/MyUser', userLogin);
adminRouter.get('/accounts', getAllAccounts);
adminRouter.get('/transactions', getAllTransactions);
adminRouter.delete('/delete-account/:id', deleteAccountById);
adminRouter.get('/user-transactions/:userId', getUserTransactionsById);
adminRouter.get('/all-transactions', getAllUserTransactions);
adminRouter.get('/logout',Logout)


module.exports = {
  adminRoute: adminRouter
};
