import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserRestService } from '../user/user-rest.service';

@Injectable({
  providedIn: 'root',
})
export class RoomRestService {
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.userRest.getToken(),
  });

  constructor(private http: HttpClient, private userRest: UserRestService) {}

  addRoom(params: {}) {
    return this.http.post(environment.baseUrl + 'room/addRoom', params, {
      headers: this.httpOptions,
    });
  }

  getRooms(idHotel: string) {
    return this.http.get(environment.baseUrl + 'room/getRooms/' + idHotel, {
      headers: this.httpOptions,
    });
  }

  getRoom(idHotel: string, idRoom: string) {
    return this.http.get(
      environment.baseUrl + 'room/getRoom/' + idHotel + '/' + idRoom,
      {
        headers: this.httpOptions,
      }
    );
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