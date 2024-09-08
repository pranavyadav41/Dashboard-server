const Employee = require("../models/employeeModel");
const asyncHandler = require("express-async-handler");

const generateEmployeeId = async () => {
  const prefix = "EMP";

  const randomNum = Math.floor(10000 + Math.random() * 90000);

  const employeeId = `${prefix}${randomNum}`;

  const existingEmployee = await Employee.findOne({ employeeId });

  if (existingEmployee) {
    return generateEmployeeId();
  }

  return employeeId;
};

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
    educationLevel,
  } = req.body;

  if (
    !name ||
    !dob ||
    !gender ||
    !email ||
    !phone ||
    !employementType ||
    !department ||
    !jobTitle ||
    !salary ||
    !address ||
    !skills ||
    !educationLevel
  ) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  const processedSkills = Array.isArray(skills)
    ? skills
    : skills.split(",").map((skill) => skill.trim());

  const emailExists = await Employee.findOne({ email });
  if (emailExists) {
    res.status(400);
    throw new Error("Employee with this email already exists");
  }

  const employeeId = await generateEmployeeId();

  const employee = await Employee.create({
    employeeId,
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
    skills: processedSkills,
    educationLevel,
  });

  if (employee) {
    res.status(201).json({ message: "Employee added successfully" });
  } else {
    res.status(400);
    throw new Error("Invalid employee data");
  }
});

// @desc    Get all employees

const getEmployees = asyncHandler(async (req, res) => {
  const employees = await Employee.find({});

  if (employees) {
    return res.status(200).json(employees);
  } else {
    res.status(404);
    throw new Error("No employees found");
  }
});

// @desc    Get an employee by ID

const getEmployeeById = asyncHandler(async (req, res) => {
  const employeeId = req.params.id;

  const employee = await Employee.find({ employeeId: employeeId });

  if (!employee) {
    res.status(404);
    throw new Error("Employee not found");
  }

  return res.status(200).json(employee);
});

// @desc    Delete a employee by ID

const deleteEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.deleteOne({ employeeId: id });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting employee:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Failed to delete employee.",
    });
  }
};

// @desc    Edit employee by Id

const editEmployee = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { id } = req.params;
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
    educationLevel,
  } = req.body;

  const employee = await Employee.findOne({ employeeId: id });

  if (!employee) {
    res.status(404);
    throw new Error("Employee not found");
  }

  if (email && email !== employee.email) {
    const emailExists = await Employee.findOne({
      email,
      employeeId: { $ne: id },
    });
    if (emailExists) {
      res.status(400);
      throw new Error("Employee with this email already exists");
    }
  }

  const processedSkills = skills
    ? Array.isArray(skills)
      ? skills
      : skills.split(",").map((skill) => skill.trim())
    : employee.skills;

  employee.name = name || employee.name;
  employee.dob = dob || employee.dob;
  employee.gender = gender || employee.gender;
  employee.email = email || employee.email;
  employee.phone = phone || employee.phone;
  employee.employementType = employementType || employee.employementType;
  employee.department = department || employee.department;
  employee.jobTitle = jobTitle || employee.jobTitle;
  employee.salary = salary || employee.salary;
  employee.address = address || employee.address;
  employee.skills = processedSkills;
  employee.educationLevel = educationLevel || employee.educationLevel;

  const updatedEmployee = await employee.save();

  if (updatedEmployee) {
    res.status(200).json({ message: "Updated details successfully" });
  } else {
    res.status(400);
    throw new Error("Failed to update employee");
  }
});

module.exports = {
  addEmployee,
  getEmployees,
  getEmployeeById,
  deleteEmployeeById,
  editEmployee,
};
