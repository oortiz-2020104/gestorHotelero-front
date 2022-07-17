import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserRestService } from '../user/user-rest.service';

@Injectable({
  providedIn: 'root',
})
export class ReservationRestService {
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.userRest.getToken(),
  });

  constructor(private http: HttpClient, private userRest: UserRestService) {}

  //* Usuario registrado ---------------------------------------------------------------------------------------
  reserveRoom(params: {}, idHotel: string, idRoom: string) {
    return this.http.post(
      environment.baseUrl + 'reservation/reserveRoom/' + idHotel + '/' + idRoom,
      params,
      {
        headers: this.httpOptions,
      }
    );
  }
}
