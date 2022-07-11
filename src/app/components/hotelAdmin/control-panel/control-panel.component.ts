import { Component, OnInit } from '@angular/core';
import { HotelRestService } from 'src/app/services/hotel/hotel-rest.service';
import { RoomRestService } from 'src/app/services/room/room-rest.service';
import { HotelModel } from 'src/app/models/hotel.model';
import { RoomModel } from 'src/app/models/room.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css'],
})
export class ControlPanelComponent implements OnInit {
  //* Hoteles ---------------------------------------------------------------------------------------

  hotel: HotelModel;
  hotels: any;
  hotelGetData: any;
  searchHotel: String = '';

  constructor(
    private hotelRest: HotelRestService,
    private roomRest: RoomRestService
  ) {
    this.hotel = new HotelModel('', '', '', '', '');
    this.room = new RoomModel('', '', '', '', 0, false, '');
  }

  ngOnInit(): void {
    this.getHotels();
  }

  addHotel(addHotelForm: any) {
    this.hotelRest.addHotel(this.hotel).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: res.message,
        });
        this.getHotels();
        addHotelForm.reset();
      },
      error: (err) => {
        Swal.fire({
          icon: 'warning',
          title: err.error.message || err.error,
        });
      },
    });
  }

  getHotels() {
    this.hotelRest.getHotels().subscribe({
      next: (res: any) => {
        this.hotels = res.hotels;
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  getHotel(id: string) {
    this.hotelRest.getHotel(id).subscribe({
      next: (res: any) => {
        this.hotelGetData = res.hotel;
      },
      error: (err) => {
        Swal.fire({
          icon: 'warning',
          title: err.error.message || err.error,
        });
      },
    });
  }

  updateHotel() {
    this.hotelGetData.adminHotel = undefined;
    this.hotelGetData.image = undefined;

    this.hotelRest
      .updateHotel(this.hotelGetData, this.hotelGetData._id)
      .subscribe({
        next: (res: any) => {
          Swal.fire({
            icon: 'success',
            title: res.message,
          });
          this.getHotels();
        },
        error: (err) => {
          Swal.fire({
            icon: 'warning',
            title: err.error.message || err.error,
          });
        },
      });
  }

  deleteHotel(id: string) {
    Swal.fire({
      title: '¿Estás seguro de eliminar este hotel?',
      text: '¡Esta acción no se puede revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, quiero eliminarlo',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.hotelRest.deleteHotel(id).subscribe({
          next: (res: any) => {
            Swal.fire({
              icon: 'success',
              title: res.message,
            });
            this.getHotels();
          },
          error: (err: any) => {
            Swal.fire({
              icon: 'warning',
              title: err.error.message || err.error,
            });
          },
        });
      }
    });
  }

  //* Habitaciones ---------------------------------------------------------------------------------------
  hotelGetId: any;

  room: RoomModel;
  rooms: any;
  roomGetData: any;

  addRoom(addRoomForm: any) {
    this.room.hotel = this.hotelGetId;
    this.roomRest.addRoom(this.room).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: res.message,
        });
        this.getRooms(this.hotelGetId);
        addRoomForm.reset();
      },
      error: (err) => {
        Swal.fire({
          icon: 'warning',
          title: err.error.message || err.error,
        });
      },
    });
  }

  getRooms(idHotel: string) {
    this.hotelGetId = idHotel;
    this.roomRest.getRooms(idHotel).subscribe({
      next: (res: any) => {
        this.rooms = res.rooms;
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  getRoom(idRoom: string) {
    this.roomRest.getRoom(this.hotelGetId, idRoom).subscribe({
      next: (res: any) => {
        this.roomGetData = res.checkRoomHotel;
        console.log(this.roomGetData);
      },
      error: (err) => {
        Swal.fire({
          icon: 'warning',
          title: err.error.message || err.error,
        });
      },
    });
  }

  updateRoom() {
    this.roomGetData.hotel = undefined;
    this.roomRest
      .updateRoom(this.roomGetData, this.hotelGetId, this.roomGetData._id)
      .subscribe({
        next: (res: any) => {
          Swal.fire({
            icon: 'success',
            title: res.message,
          });
          this.getHotels();
          this.getRooms(this.hotelGetId);
        },
        error: (err) => {
          Swal.fire({
            icon: 'warning',
            title: err.error.message || err.error,
          });
        },
      });
  }

  deleteRoom(idRoom: string) {
    Swal.fire({
      title: '¿Estás seguro de eliminar esta habitación?',
      text: '¡Esta acción no se puede revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, quiero eliminarlo',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.roomRest.deleteRoom(this.hotelGetId, idRoom).subscribe({
          next: (res: any) => {
            Swal.fire({
              icon: 'success',
              title: res.message,
            });
            this.getRooms(this.hotelGetId);
          },
          error: (err: any) => {
            Swal.fire({
              icon: 'warning',
              title: err.error.message || err.error,
            });
          },
        });
      }
    });
  }
}
