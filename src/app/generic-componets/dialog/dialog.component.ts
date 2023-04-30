import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.calculateTotalPay();
  }

  calculateTotalPay() {
    this.data.totalCost = this.data.basisCost + (this.data.basisCost * (this.data.taxes / 100));
  }

  onConfirm(): void {
    const confirmData = {
      confirm: 'Ok',
      subs: this.data
    }
    this.dialogRef.close(confirmData);
  }
}
