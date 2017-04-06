import {Injectable} from "@angular/core";
import {Http, RequestOptions, Headers} from "@angular/http";
import {Observable} from 'rxjs/Rx'


//TODO come back and encode and make this secure-er
@Injectable()
/**
 * Service to perform variety of user data retrieval.
 * Makes calls to our API to grab schedule events, get various values from db.
 */
export class UserService {


  constructor(private http: Http) {
  }
  /**
   * Take username from input field and check if there is a corresponding user id.
   * @param username
   * @returns {Observable<R>}
   */
  getUserIdFromUserName(username) {

    return this.http.get("http://localhost:56586/api/users/get-userid/" + username)
      .map(
        response => response.json(),
        err => console.log(err))
  }

  /**
   * Take employee id and retrieves the corresponding user id, if there is one.
   * @param userId
   * @returns {Observable<R>}
   */
  getEmployeeIdFromUserId(userId) {
    return this.http.get("http://localhost:56586/api/employee/get-id/" + userId)
      .map(
        response => response.json(),
        err => console.log(err))
  }

  /**
   * Take a given date and grab the corresponding schedule event for the employee, if there is one.
   * @param dateTime
   * @returns {Observable<R>}
   */
  getDateEvent(dateTime) {
    return this.http.get("http://localhost:56586/api/schedule-events/date-events/" + localStorage.getItem("EmployeeId") + "/" + dateTime)
      .map(
        response => response.json(),
        err => console.log(err))
  }

  /**
   * Check for a schedule event past the current day for an employee.
   * @returns {Observable<R>}
   */
  getNextEvent() {
    return this.http.get("http://localhost:56586/api/schedule-events/next-event/" + localStorage.getItem("EmployeeId"))
      .map(
        response => response.json(),
        err => console.log(err))
  }

  /**
   * Return all schedule events for the next seven days for an employee.
   * @returns {Observable<R>}
   */
  getWeekView(dateTime) {
    return this.http.get("http://localhost:56586/api/schedule-events/current-week-events/" + localStorage.getItem("EmployeeId") + "/" + dateTime.toISOString())
      .map(
        response => response.json(),
        err => console.log(err))
  }

  /**
   * Return all schedule events for previous seven days before a given date for an employee.
   * @returns {Observable<R>}
   */
  getPrevWeek(dateTime) {
    return this.http.get("http://localhost:56586/api/schedule-events/last-week-events/" + localStorage.getItem("EmployeeId") + "/" + dateTime.toISOString())
      .map(
        response => response.json(),
        err => console.log(err))
  }

  /**
   * Return all schedule events for seven days past given date for an employee.
   * @returns {Observable<R>}
   */
  getNextWeek(dateTime) {
    return this.http.get("http://localhost:56586/api/schedule-events/next-week-events/" + localStorage.getItem("EmployeeId") + "/" + dateTime.toISOString())
      .map(
        response => response.json(),
        err => console.log(err))
  }

  /**
   * Get first name of an employee.
   * @param name
   * @returns {Observable<R>}
   */
  getFirstName(name) {
    return this.http.get("http://localhost:56586/api/employee/get-name/" + name)
      .map(
        response => console.log(response),
        err => console.log(err))
  }

  /**
   * Retrieve an employee's position title.
   * @param positionId
   * @returns {Observable<R>}
   */
  getPositionName(positionId) {
    return this.http.get("http://localhost:56586/api/positions/position-name/" + positionId)
      .map(
        response => response.json(),
        err => console.log(err))
  }

  /**
   * Add/Edit a schedule event's notes field.
   * @param noteText
   * @param scheduleEventId
   * @returns {Observable<R>}
   */
  updateNote(noteText, scheduleEventId)
  {
    let noteBody = JSON.stringify({NoteText: noteText});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let reqOpts = new RequestOptions({headers: headers});

    return this.http.patch("http://localhost:56586/api/schedule-events/update-note/" + scheduleEventId, noteBody, reqOpts)
      .map(
        response => response.json(),
        err => console.log(err))
  }
}
