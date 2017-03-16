import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from 'rxjs/Rx'



@Injectable()
export class UserService {
  userId: any = localStorage.getItem("UserId");
  employeeId: any = localStorage.getItem("EmployeeId");

  constructor(private http: Http) {
  }

  getUserIdFromUserName(username)
  {
    return this.http.get("http://localhost:56586/api/users/get-userid/" + username)
      .map(response => response.json());
  }

  getEmployeeIdFromUserId(userId)
  {
    return this.http.get("http://localhost:56586/api/employee/get-id/" + userId)
      .map(response => response.json());
  }

  getTodayEvent()
  {
    return this.http.get("http://localhost:56586/api/schedule-events/today-events/" + this.employeeId)
      .map(response => response.json());
  }

  getNextEvent()
  {
    return this.http.get("http://localhost:56586/api/schedule-events/next-event/" + this.employeeId)
      .map(response => response.json());
  }

  getWeekView()
  {
    return this.http.get("http://localhost:56586/api/schedule-events/week-events/" + this.employeeId)
      .map(response => response.json());
  }
}
