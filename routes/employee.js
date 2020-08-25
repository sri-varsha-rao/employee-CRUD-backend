const express = require("express");
const router = express.Router();
const {getEmployee,getEmployeeById,createEmployee,
    getAllEmployees,updateEmployee,removeEmployee}=require("../controllers/employee");
 

router.param("employeeId",getEmployeeById);

//create operation
router.post("/create/employee",createEmployee);

//read operation
router.get("/get/employee/:employeeId",getEmployee);
router.get("/getAll",getAllEmployees);

//update operation
router.put("/update/employee/:employeeId",updateEmployee);

//delete operation
router.delete("/delete/employee/:employeeId",removeEmployee);


module.exports = router; 