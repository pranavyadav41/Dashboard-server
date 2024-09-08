const express = require('express');
const router = express.Router();
const {addEmployee, getEmployees,getEmployeeById,deleteEmployeeById,editEmployee} = require('../controllers/userController')


router.post('/addEmployee', addEmployee);
router.get('/getEmployees',getEmployees);
router.get('/getEmployee/:id',getEmployeeById);
router.post('/deleteEmployee/:id',deleteEmployeeById)
router.post('/editEmployee/:id',editEmployee)

module.exports = router;
    