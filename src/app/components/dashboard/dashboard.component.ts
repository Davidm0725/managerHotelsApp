import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HotelsService } from 'src/app/commons/services/hotels.service';
import { environment } from 'src/enviroments/environment';

const urlBase = environment.URL_BASE;


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  displayedColumns: string[] = ['Id', 'Name', 'Location', 'Phone Number', 'Country Name', 'Status', 'Rooms', 'Rooms available', 'Actions'];
  dataSource: any = [];
  crateDialog = false;
  roomDialog = false;
  hotelAddRoom: any;
  hotelAction: any;
  addHt: any;
  page = 1;
  totalPage = 0;
  resultxPage = 0;
  numRegisters!: number;
  private dialog = inject(MatDialog);
  private hotelsSvc = inject(HotelsService);

  editRm = false;
  roomsHotel: any = {};


  constructor() {
  }

  ngOnInit() {
    this.getHotels();
  }
  ngOnDestroy() {
    this.dataSource = [];
  }

  getHotels() {
    var countRoomAvailable = 0;
    this.hotelsSvc.getHotels(`${urlBase}`).subscribe(
      {
        next: resp => {
          if (resp.length > 1) {
            resp.splice(0, 1);
            resp.forEach((e: any) => {
              e.rooms.map((r: any) => {
                if (r.status === "available") {
                  countRoomAvailable = countRoomAvailable + 1;
                }
              })
              e.roomsAvailable = countRoomAvailable;
              countRoomAvailable = 0;
            });
            this.dataSource = resp;
          }
        }
      }
    );
  }

  goBack(event: any) {
    this.editRm = event;
    this.getHotels();
  }

  editRooms(element: any) {
    this.editRm = true;
    this.roomsHotel = element;
  }

  addHotel() {
    this.hotelAction = { action: 'add', hotelUpdate: "" };
    this.crateDialog = true;
  }

  updateHotel(element: any) {
    this.hotelAction = { action: 'update', hotelUpdate: element };
    this.crateDialog = true;
  }

  changeStatusHotel(hotel: any) {
    hotel.status = hotel.status === "available" ? "disabled" : "available";
    this.hotelsSvc.updateStatusHotel(`${urlBase}`, hotel)
      .subscribe(() => this.ngOnInit());
  }

  hideDialog(event: any) {
    this.crateDialog = event.creaDialog;
    if (event.action === 'save') {
      this.addHt = event.hotel;
      this.getHotels();
    } else {
      this.hotelAction = "";
    }
  }
}
