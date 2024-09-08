const express = require('express');
const router = express.Router();
const {addEmployee} = require('../controllers/userController')


router.post('/aa', addEmployee);

module.exports = router;
