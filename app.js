const express = require('express')
const session = require('express-session')
require('dotenv').config();

const app = express()


const PORT = process.env.PORT || 3000;


app.use(session({
    secret : process.env.SESSION_SECRET || 'dev_secret',
    resave : false,
    saveUninitialized : false,
    cookie : {maxAge : 1000 * 60 * 60 * 24}
})
    
)








app.use((err,req,res,next) => {
    console.log("서버 오류", err);
    res.status(500).json({ message: "서버 오류" });
})


app.listen(PORT, () => {
    console.log(`http://localhost:${3000}`);
})