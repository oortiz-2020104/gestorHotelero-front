import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchHotel',
})
export class SearchHotelPipe implements PipeTransform {
  transform(hotels: any, searchHotel: any) {
    if (searchHotel == undefined) {
      return hotels;
    } else {
      return hotels.filter((product: any) => {
        return product.name.toLowerCase().includes(searchHotel.toLowerCase());
      });
    }
  }
}
