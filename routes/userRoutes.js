const express = require('express');
const router = express.Router();

const {signUp ,logIn, logout} = require("../controllers/userControllers");

router.post('/signup', signUp);
router.post('/login' , logIn);
router.get("/logout" , logout)

module.exports = router;