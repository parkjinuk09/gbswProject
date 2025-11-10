const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

router.get('/register', (req, res) => {
    res.render("register");
});

router.post('/register', authController.register);

router.get('/login', (req, res) => {
    res.render("login");
});

router.post('/login', authController.login);

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
});

module.exports = router;
///