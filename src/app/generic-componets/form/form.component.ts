import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/enviroments/environment';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { HotelsService } from 'src/app/commons/services/hotels.service';

const urlBase = environment.URL_BASE;


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  styles: [`
  :host ::ng-deep .p-dialog .product-image {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: block;
  }
`],
  providers: [MessageService]
})
export class FormComponent {
  @Input() openForm!: boolean;
  @Input() hotelAction!: any;
  @Output() hideForm = new EventEmitter<any>();
  pattern = "^[a-z|0-9|A-Z]*([_][a-z|0-9|A-Z]+)*([.][a-z|0-9|A-Z]+)*([.][a-z|0-9|A-Z]+)*(([_][a-z|0-9|A-Z]+)*)?@[a-z][a-z|0-9|A-Z]*\.([a-z][a-z|0-9|A-Z]*(\.[a-z][a-z|0-9|A-Z]*)?)$";

  formCreate: any;
  crateDialog!: boolean;
  submitted: boolean = false;
  page: number = 1;
  countries!: any;
  private hotelsSvc = inject(HotelsService);
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);
  private router = inject(Router);

  constructor() {
    this.resetForm();
  }


  ngOnInit() {
    this.crateDialog = this.openForm;
    this.validateUpdate();

  }

  validateUpdate() {
    const { action, hotelUpdate } = this.hotelAction;
    if (action === 'update') {
      this.formCreate.setValue({
        name: hotelUpdate.name,
        email: hotelUpdate.email,
        country: hotelUpdate.country,
        location: hotelUpdate.location,
        phoneNumber: hotelUpdate.phone
      });
    }


  }

  hideDialog(action: any) {
    this.crateDialog = false;
    this.submitted = false;
    this.hideForm.emit({ creaDialog: this.crateDialog, action: action.action, hotel: action.hotelAdd });
    this.resetForm();
  }

  resetForm() {
    this.formCreate = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern(this.pattern)]],
      location: ['', [Validators.required]],
      country: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern("[0-9 ]{12}")]]
    });
  }

  saveAll(form: FormGroup) {
    const { action } = this.hotelAction;
    if (action === 'update') {
      this.saveUpdateSubscriber(form)
    } else {
      this.addHotel(form);
    }

  }

  saveUpdateSubscriber(formUpdate: any) {
    const { hotelUpdate } = this.hotelAction;
    console.log(formUpdate.value.phone, 'formUpdate.value.phone')
    const body = {
      "id": hotelUpdate.id,
      "name": formUpdate.value.name,
      "country": formUpdate.value.country,
      "location": formUpdate.value.location,
      "phone": formUpdate.value.phoneNumber,
      "email": formUpdate.value.email,
      "status": "available",
      "rooms": [],
      "bookings": [],
    };
    console.log(body, 'body')
    this.hotelsSvc.updateStatusHotel(`${urlBase}`, body)
      .subscribe(() => this.hideDialog({ action: 'save', body }));
    // this.subscribers.updateSubscribers(`${urlBase}subscribers/`, body).subscribe(
    //   {
    //     next: resp => {
    //       if (resp === null) {
    //         this.hideDialog('save');
    //       } else {
    //         this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Internal server error', life: 3000 });
    //       }
    //     },
    //     error: err => {
    //       this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.Message, life: 3000 });
    //       this.router.navigate(['/', 'login'])
    //     }
    //   });
  }

  addHotel(form: FormGroup) {
    this.submitted = true;
    let bodyParamas = {
      "id": Math.floor(Math.random() * 100),
      "name": form.value.name,
      "country": form.value.country,
      "location": "av 20",
      "phone": form.value.phoneNumber,
      "email": form.value.email,
      "status": "available",
      "rooms": [],
      "bookings": [],
    };
    if (form.valid) {
      this.hotelsSvc.addHotel(`${urlBase}`, bodyParamas).subscribe(hotelAdd => {
        this.hideDialog({ action: 'save', hotelAdd });
      });
      // this..createSubscribers(`${urlBase}subscribers/`, bodyParamas).subscribe(
      //   {
      //     next: resp => {
      //       if (resp.length === 0) {
      //         this.hideDialog('save');
      //       } else {
      //         this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Internal server error', life: 3000 });
      //       }
      //     },
      //     error: err => {
      //       this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.Message, life: 3000 });
      //       this.router.navigate(['/', 'login'])
      //     }
      //   });
    }
  }

}
