import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/enviroments/environment';
import { HotelsService } from 'src/app/commons/services/hotels.service';
import Swal from 'sweetalert2';

const urlBase = environment.URL_BASE;
@Component({
  selector: 'app-form-room',
  templateUrl: './form-room.component.html',
  styleUrls: ['./form-room.component.css'],
  styles: [`
  :host ::ng-deep .p-dialog .product-image {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: block;
  }
`],
})
export class FormRoomComponent {
  @Input() openForm!: boolean;
  @Input() hotelAddRoom!: any;
  @Output() hideForm = new EventEmitter<any>();
  formCreate: any;
  crateDialog!: boolean;
  submitted: boolean = false;
  page: number = 1;
  countries!: any;
  private hotelsSvc = inject(HotelsService);
  private fb = inject(FormBuilder);

  constructor() {
    this.resetForm();
  }


  ngOnInit() {
    this.crateDialog = this.openForm;
    this.validateUpdate();
  }

  validateUpdate() {
    const { action, room } = this.hotelAddRoom;
    if (action === 'edit') {
      this.formCreate.setValue({
        numRoom: room.room,
        basisCost: room.basisCost,
        location: room.location,
        typeRoom: room.typeRoom,
        taxes: room.taxes
      });
    }
  }

  hideDialog(action: any) {
    this.crateDialog = false;
    this.submitted = false;
    this.hideForm.emit({ creaDialog: this.crateDialog, action: action });
    this.showAlert();
    this.resetForm();
  }

  showAlert() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Room has been saved currectly.',
      showConfirmButton: false,
      timer: 2000
    })
  }

  saveAll(form: FormGroup) {
    const { action } = this.hotelAddRoom;
    if (action === 'edit') {
      this.saveUpdate(form)
    } else {
      this.addRoomRequest(form);
    }

  }

  saveUpdate(formUpdate: any) {
    const { room } = this.hotelAddRoom;
    const body = {
      "id": room.id,
      "room": formUpdate.value.numRoom,
      "basisCost": formUpdate.value.basisCost,
      "location": formUpdate.value.location,
      "status": "available",
      "typeRoom": formUpdate.value.typeRoom,
      "taxes": formUpdate.value.taxes
    };
    const index = this.hotelAddRoom.hotel.rooms.findIndex((e:any) => e.id === body.id);
    this.hotelAddRoom.hotel.rooms.splice(index, 1, body)
    this.hotelsSvc.updateStatusHotel(`${urlBase}`, this.hotelAddRoom.hotel)
      .subscribe(() => this.hideDialog('save'));
  }

  addRoomRequest(form: FormGroup) {
    this.submitted = true;
    let bodyParamas = {
      "id": form.value.numRoom,
      "room": form.value.numRoom,
      "basisCost": Number(form.value.basisCost),
      "location": form.value.location,
      "typeRoom": form.value.typeRoom,
      "taxes": form.value.taxes,
      "status": "available",
    };
    if (form.valid) {
      this.hotelAddRoom.hotel.rooms.push(bodyParamas);
      this.hotelsSvc.updateStatusHotel(`${urlBase}`, this.hotelAddRoom.hotel)
        .subscribe(() => this.hideDialog('save'));
    }
  }

  resetForm() {
    this.formCreate = this.fb.group({
      numRoom: ['', Validators.required],
      basisCost: ['', [Validators.required]],
      location: ['', [Validators.required]],
      typeRoom: ['', [Validators.required]],
      taxes: ['', [Validators.required]]
    });
  }

}
