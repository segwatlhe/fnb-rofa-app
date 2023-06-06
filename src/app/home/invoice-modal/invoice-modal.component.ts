import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Order} from "../../model/order";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {OrderService} from "../../service/order.service";

@Component({
  selector: 'app-invoice-modal',
  templateUrl: './invoice-modal.component.html',
  styleUrls: ['./invoice-modal.component.css']
})
export class InvoiceModalComponent implements OnInit{

  registrationForm!: FormGroup;
  message: string | undefined;
  action: string | undefined;
  orders: Order[] = [];
  pageCustomer = 1;
  countCustomer = 5;
  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<InvoiceModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog,
              private snackBar: MatSnackBar,
              private orderService: OrderService) {
  }

  ngOnInit(): void {
    console.log('user::', this.data.user)
    console.log('invoice::', this.data.invoice)
    this.buildForm(this.data.invoice, this.data.user);
    }

  buildForm(invoiceItem: any, user: any) {
    this.registrationForm = new FormGroup({
      orderId: new FormControl(invoiceItem.id, new FormControl('')),
      userId: new FormControl(user.id, new FormControl('')),
      invoiceId: new FormControl(invoiceItem.invoice.id, new FormControl('')),
      fullName: new FormControl(invoiceItem.fullName, Validators.required),
      idNumber: new FormControl(invoiceItem.idNumber, Validators.required),
      email: new FormControl(invoiceItem.email, Validators.required),
      items: new FormControl('', Validators.required),
      account: new FormControl(invoiceItem.invoice.account, Validators.required),
      invoiceDate: new FormControl(invoiceItem.invoice.date, Validators.required),
      contactNumber: new FormControl(invoiceItem.contactNumber, [Validators.minLength(10), Validators.maxLength(10)]),
    });
  }

  download() {
    console.log('Download Invoice');
  }
}
