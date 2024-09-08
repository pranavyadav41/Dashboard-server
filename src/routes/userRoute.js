const express = require('express');
const router = express.Router();
const {addEmployee} = require('../controllers/userController')


router.post('/addEmployee', addEmployee);

module.exports = router;
