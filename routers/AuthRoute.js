const { registerUser, login } = require('../Controllers/AuthController');

const router=require('express').Router();

router.post('/register',registerUser)
router.post('/login',login);

module.exports= router;