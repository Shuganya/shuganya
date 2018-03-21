var e=require("express");
var app=e();
var bodyP=require("body-parser");
var model= require("./rndSampleModel.js");

app.use(bodyP.json())
app.use(bodyP.urlencoded({extended : true}))

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.listen(8084,function(err,result) {
  console.log("Server started");
});

app.all("",function(req,res) {
	res.send("Welcome to Employee Management System");
});	

app.get("/getEmployees",function(req,res) {
  model.getAll(function(result) {	   
       res.send(result);
  });  
});	

app.post("/deleteEmployee",function(req,res) {
	var empId = req.body.empId;
	//console.log(empId);
	model.deleteRecord(empId,function(result) {
		res.send(result);
	})		
})	

app.post("/insertEmployee",function(req,res) {
	var employee = req.body.employee;
	model.insertRecord(employee,function(result) {
		res.send(result);
	});	
});
app.post("/updateEmployee",function(req,res) {
	var employee = req.body.employee;
	model.updateRecord(employee,function(result) {
		res.send(result);
	});
});	











