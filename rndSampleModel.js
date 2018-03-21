var mysql=require("mysql");
var code = require("./statusCodes.json");
var msg = require("./message.json");

var connection =  mysql.createConnection({
	host : "localhost",
	user : "root",
	password : "",
	port : 3306,
	database : "rnd1"
});

connection.connect(function(err) {
		if(err) {
		  console.log("Error while connecting \n" + err)
		} else {
          console.log("mysql Connected");
        }		
});
		
exports.getAll = function(callback) {	  
           connection.query("select * from employee",function(err,result) {
			   if(err) {
                 console.log("Error while Executing Queries \n" + err);
				 connection.end();
				 return callback({
						statusCode : code.dpSelectionError,
						message : msg.selectQueryError
				 })
			   } else {
                 console.log("success");
                 var record = JSON.parse(JSON.stringify(result));			 
                 return callback({
						statusCode : code.success,
						message : msg.showingRecords,
						data : record 
				 })				 
              }			   
		   });   
    
}	


/*
exports.getAll = function(callback) {
	
  	connection.connect(function(err) {
		if(err) {
		  console.log("Error while connecting \n" + err)
		  
		  connection.end();
		  return callback({
			  statusCode : code.dbConnectionError,
			  message : msg.dbConnectionError
		  })
		  
		} else  {
           connection.query("select * from employee",function(err,result) {
			   if(err) {
                 console.log("Error while Executing Queries \n" + err);
				 connection.end();
				 return callback({
						statusCode : code.dpSelectionError,
						message : msg.selectQueryError
				 })
			   } else {
                 console.log("success");
                 var record = JSON.parse(JSON.stringify(result));			 
                 return callback({
						statusCode : code.success,
						message : msg.showingRecords,
						data : record 
				 })				 
              }			   
		   });   
        }		
    });		
}	

*/

exports.insertRecord = function(data,callback) {
	console.log("\n\n" +data.name +" " + data.age + " " + data.department +" " + data.gender +" " + data.designation );
	
	
	var sql = "insert into employee(Name,Age,Department,Gender,Designation) values ('" +	                 
	             data.name  + "'," +
				 data.age   + ",'" +
				 data.department + "','" +
	             data.gender + "','" + 	             
	             data.designation + "')";	 
    
    
           connection.query(sql,function(err,result) {
			   if(err) {
                 console.log("Error while Executing Queries \n" + err);
				 return callback({
						statusCode : code.dpSelectionError,
						message : msg.insertionError
				 })
			   } else {
                 console.log("success");  
				 exports.getAll(callback);					 
				 
                 //var record = JSON.parse(JSON.stringify(result));
				//console.log(record);				 
               //  return callback({
				//		statusCode : code.success,
				//		message : msg.inserted,
				//		data : record					
				// })				 
              }			   
		   });   
   			
};

exports.updateRecord = function(data,callback) {
	
	var sql = "update employee set Name='" + data.name  + "'," +
			   "Age="	+ data.age   + "," +
				"Department='" + data.department + "'," +
	            "Gender='" + data.gender + "'," + 	             
	             "Designation='" + data.designation + "' where EmpId=" +data.empId;	 
    
    
           connection.query(sql,function(err,result) {
			   if(err) {
                 console.log("Error while Executing Queries \n" + err);
				 return callback({
						statusCode : code.dpSelectionError,
						message : msg.dbUpdateError
				 })
			   } else {
                 console.log("success");
				 exports.getAll(callback);
                
				/*				
                 var record = JSON.parse(JSON.stringify(result));				 
                 return callback({
						statusCode : code.success,
						message : msg.updated,
						data : record
				 })		*/
              }			   
		   });   
   			
};

exports.deleteRecord = function(empId,callback) {
    var sql = "delete from employee where EmpId=" + empId;
	connection.query(sql,function(err,result) {
		if(err) {
		   return callback({
			   statusCode : code.error,
			   message : msg.dbUpdateError
		   });
		} else {
		  	return callback({
			   statusCode : code.success,
			   message : msg.removed
		   });
		}	
	});	
};	

/*
exports.deleteRecord(8,function(result) {
	
});
*/