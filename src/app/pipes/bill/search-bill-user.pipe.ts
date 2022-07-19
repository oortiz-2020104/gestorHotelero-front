import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchBillUser'
})
export class SearchBillUserPipe implements PipeTransform {
  transform(bills: any, searchBillUser: any) {
    if (searchBillUser == undefined) {
      return bills;
    } else {
      return bills.filter((bill: any) => {
        return bill.user.username.toLowerCase().includes(searchBillUser.toLowerCase());
      });
    }
  }
}
