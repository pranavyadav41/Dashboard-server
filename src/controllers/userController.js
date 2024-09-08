const Employee = require('../models/employeeModel');
const asyncHandler = require('express-async-handler');

// @desc    Add a new employee
// @route   POST /api/employees
// @access  Public
const addEmployee = asyncHandler(async (req, res) => {
    const { name, age } = req.body;

    console.log(name,age,"racher")

    if (!name || !age) {
        res.status(400);
        throw new Error('Please provide both name and age');
    }

    const employee = await Employee.create({
        name,
        age
    });

    if (employee) {
        res.status(201).json({
            _id: employee._id,
            name: employee.name,
            age: employee.age
        });
    } else {
        res.status(400);
        throw new Error('Invalid employee data');
    }
});

module.exports = { addEmployee };