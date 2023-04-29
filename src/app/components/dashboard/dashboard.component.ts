import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from 'src/app/generic-componets/form/form.component';
import { HotelsService } from 'src/app/commons/services/hotels.service';
import { environment } from 'src/enviroments/environment';
const urlBase = environment.URL_BASE;


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  displayedColumns: string[] = ['Id', 'Name', 'Email', 'Phone Number', 'Country Name', 'Area', 'Subscription State', 'Actions'];
  dataSource: any = [];
  crateDialog = false;
  subscriberUpdate: any;
  private dialog = inject(MatDialog);
  private hotelsSvc = inject(HotelsService);


  constructor(private router: Router) {
  }

  ngOnInit() {
    this.getHotels();
  }

  getHotels() {
    this.hotelsSvc.getHotels(`${urlBase}/hotels`).subscribe(
      {
        next: resp => {
          if (resp.data) {
            // this.countSubs = resp.Count;
            this.dataSource = resp.data;
            // this.totalPage = Math.ceil(this.countSubs / 10)
          } else {
            // this.showMessage({ severity: 'error', summary: 'Error', detail: 'Internal server error', life: 3000 });
          }
        },
        // error: err => {
        //   this.showMessage({ severity: 'error', summary: 'Error', detail: err.error.Message, life: 3000 });
        //   setTimeout(() => {
        //     this.router.navigate(['/', 'login']);
        //   }, 1000);
        // }

      });
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, element: any): void {
    const dialogRef = this.dialog.open(FormComponent, {
      width: '450px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      // if (result.confirm === 'Ok') {
      //   this.deleteSubs(result.subs);
      // }
    });

  }

  addHotel() {
    this.subscriberUpdate = { action: 'create', subsUpdate: "" };
    this.crateDialog = true;
  }

  hideDialog(event: any) {
    this.crateDialog = event.creaDialog;
    if (event.action === 'save') {
      // this.getSubscribers();
    } else {
      this.subscriberUpdate = "";
    }
  }

}
