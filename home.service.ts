import { Injectable } from '@angular/core';
import { Http } from '@angular/Http';
@Injectable()
export class HomeService {

  constructor(private http :Http) { }

deleteEmployee(id : any){
  debugger
    return this.http.post("http://192.168.0.170:8084/deleteEmployee ",id)
}

getEmployee(){
  return this.http.get("http://192.168.0.170:8084/getEmployees")
}



insertEmployee(employee : any){
  return this.http.post("http://192.168.0.170:8084/insertEmployee",employee);
}

updateEmployee(id :any){
  return this.http.post("http://192.168.0.170:8084/updateEmployee",id);
}
}
