import { Component, OnInit } from '@angular/core';
import { HotelRestService } from 'src/app/services/hotel/hotel-rest.service';
import { HotelModel } from 'src/app/models/hotel.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css'],
})
export class ControlPanelComponent implements OnInit {
  hotel: HotelModel;
  hotels: any;
  hotelGetId: any;
  searchHotel: String = '';

  constructor(private hotelRest: HotelRestService) {
    this.hotel = new HotelModel('', '', '', '', '');
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
        this.hotelGetId = res.hotel;
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
    this.hotelGetId.adminHotel = undefined;
    this.hotelGetId.image = undefined;

    this.hotelRest.updateHotel(this.hotelGetId, this.hotelGetId._id).subscribe({
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
}
