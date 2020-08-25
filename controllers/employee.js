const  Employee = require("../models/employee");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getEmployeeById= (req,res,next,id)=> {
    Employee.findById(id).exec((err,emp) => {
       if(err || !emp){
           return res.status(400).json({
               error: "No employee was found in DB"
           });
       }
       req.employee= emp;
       next();
   });
};

exports.getEmployee= (req,res) => {
   return res.json(req.employee);
};

//create operation

exports.createEmployee = (req,res) => {
    
    const { name, designation, email, phoneNo, address } = req.body;
    
        //destructure the fields
    
        if (!name || !designation || !email || !phoneNo || !address) {
          return res.status(400).json({
            error: "Please include all fields"
          });
        }
    
        let employee = new Employee(req.body);

        //save to the DB
        employee.save((err,employee) => {
            if(err){
                console.log(err);
                return res.status(400).json({
                    error:"Failed to save employee in DB"
                });
            }
            res.json(employee);
        });
        
      
};

//read operation

exports.getAllEmployees = (req,res) => {
    Employee.find().exec((err,employees) => {
        if(err){
            return res.status(400).json({
                error:"No employee found"
            })
        }
        res.json(employees);
    });
};

//update operation

exports.updateEmployee = (req,res) => {
  
    let form = new formidable.IncomingForm();
      form.keepExtensions = true;
    
      form.parse(req, (err, fields, file) => {
        if (err) {
          
          return res.status(400).json({
              
            error: "problem with image"
          });
        }
        
        //updation code
        let employee = req.employee;
        employee = _.extend(employee, fields);
    
        //handle file here
        if (file.photo) {
          if (file.photo.size > 3000000) {
            return res.status(400).json({
              error: "File size too big!"
            });
          }
          employee.photo.data = fs.readFileSync(file.photo.path);
          employee.photo.contentType = file.photo.type;
        }
        

        //save to the DB
        employee.save((err, employee) => {
          if (err) {
            res.status(400).json({
              error: "Updating employee in DB failed"
            });
          }
          res.json(employee);
        });
      });
  };
  

//delete operation

exports.removeEmployee = (req,res) => {
    const employee = req.employee;
    console.log(req.employee);
    employee.remove((err,delEmployee) =>{
        if(err){
            return res.status(400).json({
                error: "Failed to remove Product"
            });
        }
        res.json({
            message : "Successfully delete: ",delEmployee
        });
    });
  };
  