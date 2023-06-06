import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {OrderService} from "../../service/order.service";
import {PaymentService} from "../../service/payment.service";

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.css']
})
export class PaymentModalComponent implements OnInit {

  registrationForm!: FormGroup;
  message: string | undefined;
  action: string | undefined;
  paymentMethods = [
    {id: 0, name: 'EFT'},
    {id: 1, name: 'Credit or Debit'},
    {id: 3, name: 'Credit or Debit'},
    {id: 4, name: 'VISA or Master Card'},
    {id: 5, name: 'PayPall'},
    {id: 6, name: 'E-Wallet'},
    {id: 7, name: 'Geo-Payment'},
  ];
  payment: any;

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<PaymentModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog,
              private snackBar: MatSnackBar,
              private paymentService: PaymentService) {
  }

  ngOnInit(): void {
    console.log('user::', this.data.user)
    console.log('invoice::', this.data.invoice)
    this.getPaymentByUserId(this.data.user.id);
    this.buildForm(this.data.invoice, this.data.user)
  }

  buildForm(invoiceItem: any, user: any) {
    this.registrationForm = new FormGroup({
      orderId: new FormControl(invoiceItem.id, new FormControl('')),
      userId: new FormControl(user.id, new FormControl('')),
      invoiceId: new FormControl(invoiceItem.invoice.id, new FormControl('')),
      fullName: new FormControl(user.fullName, Validators.required),
      idNumber: new FormControl(user.idNumber, Validators.required),
      email: new FormControl(invoiceItem.email, Validators.required),
      items: new FormControl(user.items, Validators.required),
      paymentMethods: new FormControl('', Validators.required),
      account: new FormControl(invoiceItem.invoice.account, Validators.required),
      invoiceDate: new FormControl(invoiceItem.invoice.date, Validators.required),
      contactNumber: new FormControl(invoiceItem.contactNumber, [Validators.minLength(10), Validators.maxLength(10)]),
    });
  }

  onSubmit() {
    console.log('pay:',this.registrationForm.value);
    this.paymentService.makePayment(this.registrationForm.value).subscribe({
        next: (data: any) => {
          console.log('makePayment', data);
            this.message = 'Payment Successful';
            this.action = 'Close';
            this.snackBar.open(this.message, this.action);

        },
        error: (error: any) => {
          console.error('data', error);
          this.message = 'Payment Not Successful';
          this.action = 'Close';
          this.snackBar.open(this.message, this.action);
        },
        complete: () => {
          this.ngOnInit();
        }
      }
    );
  }

  public getPaymentByUserId(id: any) {
    this.paymentService.getPaymentByUserId(id).subscribe({
        next: (data: any) => {
          console.log('payment', data);
          this.payment = data;
        },
        error: (error: any) => {
          console.error(error);
        }
      }
    );
  }
}
