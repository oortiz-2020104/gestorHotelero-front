import { Component, OnInit } from '@angular/core';
import { HotelRestService } from 'src/app/services/hotel/hotel-rest.service';
import { RoomRestService } from 'src/app/services/room/room-rest.service';
import { ServiceRestService } from 'src/app/services/service/service-rest.service';
import { HotelModel } from 'src/app/models/hotel.model';
import { RoomModel } from 'src/app/models/room.model';
import { ServiceModel } from 'src/app/models/service.model';
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
    private roomRest: RoomRestService,
    private serviceRest: ServiceRestService
  ) {
    this.hotel = new HotelModel('', '', '', '', '');
    this.room = new RoomModel('', '', '', '', 0, false, '');
    this.service = new ServiceModel('', '', '', '', 0);
  }

  ngOnInit(): void {
    this.getHotels();
    this.labelFilter = 'Habitaciones disponibles';
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
      confirmButtonColor: '#d33',
      cancelButtonColor: '#aaa',
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
  labelFilter: any;
  searchRoom: String = '';

  room: RoomModel;
  rooms: any;
  roomGetData: any;

  toggleSearch() {
    if (this.labelFilter == 'Habitaciones disponibles') {
      this.getRoomsAvailable();
      this.labelFilter = 'Habitaciones no disponibles';
    } else if (this.labelFilter == 'Habitaciones no disponibles') {
      this.getRoomsNoAvailable();
      this.labelFilter = 'Todas las habitaciones';
    } else if (this.labelFilter == 'Todas las habitaciones') {
      this.getRooms(this.hotelGetId);
      this.labelFilter = 'Habitaciones disponibles';
    }
  }

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
    this.labelFilter = 'Habitaciones disponibles';
    this.roomRest.getRooms(idHotel).subscribe({
      next: (res: any) => {
        this.rooms = res.rooms;
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  getRoomsAvailable() {
    this.roomRest.getRoomsAvailable(this.hotelGetId).subscribe({
      next: (res: any) => {
        this.rooms = res.rooms;
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  getRoomsNoAvailable() {
    this.roomRest.getRoomsNoAvailable(this.hotelGetId).subscribe({
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
      confirmButtonColor: '#d33',
      cancelButtonColor: '#aaa',
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

  //* Habitaciones ---------------------------------------------------------------------------------------
  searchService: String = '';

  service: ServiceModel;
  services: any;
  serviceGetData: any;

  addService(addServiceForm: any) {
    this.service.hotel = this.hotelGetId;
    this.serviceRest.addService(this.service).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: res.message,
        });
        this.getServices(this.hotelGetId);
        addServiceForm.reset();
      },
      error: (err) => {
        Swal.fire({
          icon: 'warning',
          title: err.error.message || err.error,
        });
      },
    });
  }

  getServices(idHotel: string) {
    this.hotelGetId = idHotel;
    this.serviceRest.getServices(idHotel).subscribe({
      next: (res: any) => {
        this.services = res.services;
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  getService(idService: string) {
    this.serviceRest.getService(this.hotelGetId, idService).subscribe({
      next: (res: any) => {
        this.serviceGetData = res.checkServiceHotel;
      },
      error: (err) => {
        Swal.fire({
          icon: 'warning',
          title: err.error.message || err.error,
        });
      },
    });
  }

  updateService() {
    this.serviceGetData.hotel = undefined;
    this.serviceRest
      .updateService(this.serviceGetData, this.hotelGetId, this.serviceGetData._id)
      .subscribe({
        next: (res: any) => {
          Swal.fire({
            icon: 'success',
            title: res.message,
          });
          this.getHotels();
          this.getServices(this.hotelGetId);
        },
        error: (err) => {
          Swal.fire({
            icon: 'warning',
            title: err.error.message || err.error,
          });
        },
      });
  }

  deleteService(idService: string) {
    Swal.fire({
      title: '¿Estás seguro de eliminar esta habitación?',
      text: '¡Esta acción no se puede revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Sí, quiero eliminarlo',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceRest.deleteService(this.hotelGetId, idService).subscribe({
          next: (res: any) => {
            Swal.fire({
              icon: 'success',
              title: res.message,
            });
            this.getServices(this.hotelGetId);
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
