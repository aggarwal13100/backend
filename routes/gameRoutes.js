const express = require('express');
const { getSentence, doesWon } = require('../controllers/gameControllers');
const { auth } = require('../middleware/auth');

const router = express.Router();

// adding the auth middleware before attending the request to authenticate a valid user
router.get('/sentence' , auth , getSentence);
router.post('/result' , auth , doesWon);

module.exports = router;