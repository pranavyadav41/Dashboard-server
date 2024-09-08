const Employee = require('../models/employeeModel');
const asyncHandler = require('express-async-handler');

// @desc    Add a new employee

const addEmployee = asyncHandler(async (req, res) => {
    const {
        name,
        dob,
        gender,
        email,
        phone,
        employementType,
        department,
        jobTitle,
        salary,
        address,
        skills,
        educationLevel
    } = req.body;

    if (!name || !dob || !gender || !email || !phone || !employementType || !department || !jobTitle || !salary || !address || !skills || !educationLevel) {
        res.status(400);
        throw new Error('Please provide all required fields');
    }

    const processedSkills = Array.isArray(skills) ? skills : skills.split(',').map(skill => skill.trim());

    const emailExists = await Employee.findOne({ email });
    if (emailExists) {
        res.status(400);
        throw new Error('Employee with this email already exists');
    }

    const employee = await Employee.create({
        name,
        dob,
        gender,
        email,
        phone,
        employementType,
        department,
        jobTitle,
        salary,
        address,
        skills:processedSkills,
        educationLevel
    });

    if (employee) {
        res.status(201).json({
            _id: employee._id,
            name: employee.name,
            dob: employee.dob,
            gender: employee.gender,
            email: employee.email,
            phone: employee.phone,
            employementType: employee.employementType,
            department: employee.department,
            jobTitle: employee.jobTitle,
            salary: employee.salary,
            address: employee.address,
            skills: employee.skills,
            educationLevel: employee.educationLevel
        });
    } else {
        res.status(400);
        throw new Error('Invalid employee data');
    }
});

module.exports = { addEmployee };
