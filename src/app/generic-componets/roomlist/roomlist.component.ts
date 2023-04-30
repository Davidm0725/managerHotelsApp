import { Component, Output, EventEmitter, Input, ViewChild, inject } from '@angular/core';
import { environment } from 'src/enviroments/environment';
import { MatTable } from '@angular/material/table';
import { HotelsService } from 'src/app/commons/services/hotels.service';



const urlBase = environment.URL_BASE;

@Component({
  selector: 'app-roomlist',
  templateUrl: './roomlist.component.html',
  styleUrls: ['./roomlist.component.css'],
})
export class RoomlistComponent {
  @ViewChild(MatTable) table!: MatTable<any>;
  @Output() editRm = new EventEmitter<any>();
  @Input() roomsHotel!: any;
  displayedColumns: string[] = ['Id', 'Room', 'Location', 'Basic cost', 'Type Room', 'Taxes', 'Rooms staus', 'Actions'];
  dataSource: any[] = [];
  roomDialog = false;
  hotelAddRoom: any;
  afterSave = true;

  private hotelsSvc = inject(HotelsService);


  constructor() {
  }

  ngOnInit() {
    this.dataSource = this.roomsHotel.rooms;
  }


  addRoom() {
    this.hotelAddRoom = { action: 'add', hotel: this.roomsHotel };
    this.roomDialog = true;
  }

  editRoom(element: any) {
    this.hotelAddRoom = { action: 'edit', hotel: this.roomsHotel, room: element };
    this.roomDialog = true;
  }

  changeState(room: any) {
    const index = this.roomsHotel.rooms.findIndex((e:any) => e.id === room.id);
    this.roomsHotel.rooms[index].status = this.roomsHotel.rooms[index].status === "available" ? "disabled" : "available";
    this.hotelsSvc.updateStatusHotel(`${urlBase}`, this.roomsHotel)
      .subscribe(() => this.ngOnInit());
  }

  hideDialogRoom(event: any) {
    this.roomDialog = event.creaDialog;
    this.table.renderRows();
  }



  goBack() {
    this.editRm.emit(false);
  }
}
