import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

@Injectable()
export class UserService {
  UserId: any;

  constructor(private http: Http) {
  }

  getTodayEvent()
  {
    return this.http.get("http://localhost:56586/api/schedule-events/today-events/24533")
      .map(response => response.json());
  }

  getNextEvent()
  {
    return this.http.get("http://localhost:56586/api/schedule-events/next-event/24533")
      .map(response => response.json());
  }

  getWeekView()
  {
    return this.http.get("http://localhost:56586/api/schedule-events/week-events/24533")
      .map(response => response.json());
  }
}
