import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../model/user";
import {OrderService} from "../../service/order.service";
import {Order} from "../../model/order";

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.css']
})
export class OrderModalComponent implements OnInit {

  registrationForm!: FormGroup;
  message: string | undefined;
  action: string | undefined;
  orders: Order[] = [];
  orders2: any;
  pageCustomer = 1;
  countCustomer = 5;

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<OrderModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog,
              private snackBar: MatSnackBar,
              private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.getOrdersByUserId(this.data.user.id);
    this.buildForm(this.data.user);
  }

  items = [
    {id: '0', name: 'Available Stock'},
    {id: '1', name: 'Unavailable Stock'},
  ];

  buildForm(item: User) {
    this.registrationForm = this.formBuilder.group({
      userId: new FormControl(item.id, Validators.required),
      fullName: new FormControl(item.fullName, Validators.required),
      idNumber: new FormControl(item.idNumber, Validators.required),
      email: new FormControl(item.email, Validators.required),
      items: new FormControl('', Validators.required),
      contactNumber: new FormControl(item.contactNumber, [Validators.minLength(10), Validators.maxLength(10)]),
    });
  }

  onSubmit() {
    console.log(this.registrationForm.value);
    this.orderService.createOrder(this.registrationForm.value).subscribe({
        next: (data: any) => {
          console.log('createOrder', data);
          if (data.items === '0') {
            this.message = 'Order Placed Successfully';
            this.action = 'Close';
            this.snackBar.open(this.message, this.action);
          } else {
            this.message = 'Stock Not Available. Order Not Placed.';
            this.action = 'Close';
            this.snackBar.open(this.message, this.action);
          }
        },
        error: (error: any) => {
          console.error('data', error);
          this.message = 'Order Not Placed Successfully';
          this.action = 'Close';
          this.snackBar.open(this.message, this.action);
        },
        complete: () => {
          this.ngOnInit();
        }
      }
    );
  }


  public getOrdersByUserId(id: any) {
    this.orderService.getOrdersByUserId(id).subscribe({
        next: (data: any) => {
          console.log('getOrdersByUserId', data);
          this.orders2 = data;
        },
        error: (error: any) => {
          console.error(error);
        }
      }
    );
  }

}
