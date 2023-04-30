import { Component, inject } from '@angular/core';
import { HotelsService } from 'src/app/commons/services/hotels.service';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/enviroments/environment';
import { DialogComponent } from 'src/app/generic-componets/dialog/dialog.component';
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
  private dialog = inject(MatDialog);

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
      this.dataSource = bookings.map((e: any) => e.bookings);
    })
  }


  detailsBooking(element: any): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '450px',
      data: element
    });

    dialogRef.afterClosed().subscribe(() => { });

  }

}
