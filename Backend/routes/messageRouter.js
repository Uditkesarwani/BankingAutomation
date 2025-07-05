const express = require('express');
const messageRouter = express.Router();
const {message , getAllMessages } = require('../controllers/messageController');


messageRouter.post('/messages',message)
messageRouter.get('/messages',getAllMessages )

module.exports= {messageRouter};