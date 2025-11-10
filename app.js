const express = require('express');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

const authRouter = require('./routes/authRouter');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET || 'dev_secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', authRouter);

app.use((err, req, res, next) => {
    console.error("서버 오류:", err);
    res.status(500).json({ message: "서버 오류" });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
