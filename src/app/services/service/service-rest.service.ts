import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserRestService } from '../user/user-rest.service';

@Injectable({
  providedIn: 'root',
})
export class ServiceRestService {
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.userRest.getToken(),
  });

  constructor(private http: HttpClient, private userRest: UserRestService) {}

  addHotel(params: {}) {
    return this.http.post(environment.baseUrl + 'hotel/addHotel', params, {
      headers: this.httpOptions,
    });
  }

  getHotels() {
    return this.http.get(environment.baseUrl + 'hotel/getHotels', {
      headers: this.httpOptions,
    });
  }

  getHotel(id: string) {
    return this.http.get(environment.baseUrl + 'hotel/getHotel/' + id, {
      headers: this.httpOptions,
    });
  }

  updateHotel(params: {}, id: string) {
    return this.http.put(
      environment.baseUrl + 'hotel/updateHotel/' + id,
      params,
      {
        headers: this.httpOptions,
      }
    );
  }

  deleteHotel(id: string) {
    return this.http.delete(environment.baseUrl + 'hotel/deleteHotel/' + id, {
      headers: this.httpOptions,
    });
  }
}
