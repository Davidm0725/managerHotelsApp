import { Component, inject } from '@angular/core';
import { HotelsService } from 'src/app/commons/services/hotels.service';
import { environment } from 'src/enviroments/environment';
const urlBase = environment.URL_BASE;


@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent {
  displayedColumns: string[] = ['Name', 'Room', 'Hostname', 'Status', 'Actions'];
  dataSource: any = [];
  private hotelsSvc = inject(HotelsService);

  constructor() {

  }

  ngOnInit() {
    this.getBookings();
  }

  getBookings() {
    let bookings = [];
    this.hotelsSvc.getHotels(`${urlBase}`).subscribe(data => {
      data.splice(0, 1);
      bookings = data.filter((e: any) => e.bookings.length > 0);
      console.log(bookings, 'DAta')
      this.dataSource = bookings.map((e: any) => e.bookings);
    })
  }

  detailsBooking(element: any) {
   
  }

}
