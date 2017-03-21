import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from 'rxjs/Rx'


@Injectable()
export class UserService {


  constructor(private http: Http) {
  }

  getUserIdFromUserName(username) {

    return this.http.get("http://localhost:56586/api/users/get-userid/" + username)
      .map(
        response => response.json(),
        err => console.log(err))
  }

  getEmployeeIdFromUserId(userId) {
    return this.http.get("http://localhost:56586/api/employee/get-id/" + userId)
      .map(
        response => response.json(),
        err => console.log(err))
  }

  getDateEvent(dateTime) {
    return this.http.get("http://localhost:56586/api/schedule-events/date-events/" + localStorage.getItem("EmployeeId") + "/" + encodeURIComponent(dateTime))
      .map(
        response => response.json(),
        err => console.log(err))
  }

  getNextEvent() {
    return this.http.get("http://localhost:56586/api/schedule-events/next-event/" + localStorage.getItem("EmployeeId"))
      .map(
        response => response.json(),
        err => console.log(err))
  }

  getWeekView() {
    return this.http.get("http://localhost:56586/api/schedule-events/week-events/" + localStorage.getItem("EmployeeId"))
      .map(
        response => response.json(),
        err => console.log(err))
  }

  getFirstName(name) {
    return this.http.get("http://localhost:56586/api/employee/get-name/" + name)
      .map(
        response => console.log(response),
        err => console.log(err))
  }


  getPositionName(positionId) {
    return this.http.get("http://localhost:56586/api/positions/position-name/" + positionId)
      .map(
        response => response.json(),
        err => console.log(err))
  }
}
