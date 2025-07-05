const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { ConnectDB } = require("./config/ConnectDB");
const verify = require("./middleware/veryfy");
const {transactionRoute} = require('./routes/transactionRoute')
const { adminRoute } = require('./routes/adminRouter');
const {authRouter} = require('./routes/authRouter');
const {messageRouter} = require('./routes/messageRouter');

require('dotenv').config();
const mongoURI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

ConnectDB(mongoURI)


const app = express();

// ✅ Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// ✅ CORS Configuration
app.use(cors({
    origin: "http://localhost:5173",  // ✅ Your frontend URL
    credentials: true  // ✅ Important for cookies
}));


app.use('/verify',verify, (req , res)=>{
    const user = req.user;

    if(!user){

        res.status(401).json({success:'false', message:'You are Not Otherize Person',user:user});
    }

    // console.log(user.id);
    
    res.status(200).json({success:'true', message:'success full login',user:user});
});
app.use('/api/transactions', transactionRoute)
app.use('/api/admin',adminRoute)
app.use('/api',authRouter);
app.use('/api',messageRouter)


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

