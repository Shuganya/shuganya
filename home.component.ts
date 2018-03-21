import { Component, OnInit } from '@angular/core';
import { HomeService } from "../home.service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private home : HomeService) { }
result :any;
employee : any = [];
  ngOnInit() {
    
    this.home.getEmployee()
    .subscribe(
      data => {
          this.result = data.json();
          if(this.result.statusCode == 200){
          this.employee = this.result.data;
      }
       } ,
      error =>{
          console.log('Error in getting data')
      }
    );
    
  }
  model :any= {};
  
delete(EmpId,index){
    this.home.deleteEmployee({empId : EmpId})
    .subscribe(
      data=>{
        this.result = data.json();
        if(this.result.statusCode == 200){
          this.employee.splice(index,1);
        }

      },
        error=>{
            console.log("error in deleting record")
        }
    );
}

edit(index){
  debugger;
  this.flag=false;
   var object=this.employee[index];
    this.model.id=object.EmpId;
    this.model.empname=object.Name;
    this.model.age = object.Age;
    this.model.gender = object.Gender;
    this.model.designation = object.Designation;
    this.model.department = object.Department;
    
  
}
newEmployee(){

}

flag :boolean = true;

save(){
  if(this.flag){
  debugger
    var empDet = { 
       name : this.model.empname ,
        age : parseInt(this.model.age) ,
        gender : this.model.gender,
        designation : this.model.designation,
        department : this.model.department }

      this.home.insertEmployee({employee : empDet})
      .subscribe(
        data=>{
             this.result = data.json();
          if(this.result.statusCode == 200){
          this.employee = this.result.data;
        }
    this.model.empname=null;
    this.model.age = null;
    this.model.gender =null;
    this.model.designation = null;
    this.model.department = null;
         alert('Data Inserted');
         this.flag=true;
        },
        error =>{
          console.log('error in inserting record');
        }
      );
}
    else{
       var empDetl = { 
        empId : this.model.id,name : this.model.empname ,
        age : parseInt(this.model.age) ,
        gender : this.model.gender,
        designation : this.model.designation,
        department : this.model.department }

      this.home.updateEmployee({employee : empDetl})
      .subscribe(
        data=>{
             this.result = data.json();
          if(this.result.statusCode == 200){
          this.employee = this.result.data;
        }
    this.model.empname=null;
    this.model.age = null;
    this.model.gender =null;
    this.model.designation = null;
    this.model.department = null;
         alert('Data Updated');
         this.flag = true;
        },
        error =>{
          console.log('error in updating record');
        }
      );
    }
}
    
}
