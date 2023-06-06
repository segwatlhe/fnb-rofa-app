import {Component} from '@angular/core';
import {RegistrationModalComponent} from "./registration-modal/registration-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {RegistrationService} from "../service/registration.service";
import {User} from "../model/user";
import {OrderModalComponent} from "./order-modal/order-modal.component";
import {InvoiceModalComponent} from "./invoice-modal/invoice-modal.component";
import {OrderService} from "../service/order.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PaymentModalComponent} from "./payment-modal/payment-modal.component";
import {SettleAccountModalComponent} from "./settle-account-modal/settle-account-modal.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  pageCustomer = 1;
  countCustomer = 5;
  users: User[] = [];
  invoice: any;
  message: string | undefined;
  action: string | undefined;

  constructor(private registrationService: RegistrationService,
              private orderService: OrderService,
              private router: Router,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getUsers();
  }

  openRegistrationModal() {
    const dialogRef = this.dialog.open(RegistrationModalComponent, {
      width: '1750px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((data) => {
      this.ngOnInit();
    });
  }

  private getUsers() {
    this.registrationService.getUsers().subscribe({
        next: (data: any) => {
          this.users = data;
        },
        error: (error: any) => {
          console.error(error);
        }
      }
    );
  }

  public placeOrder(user: User) {

    console.log(user);
    // place order
    const dialogRef = this.dialog.open(OrderModalComponent, {
      width: '1750px',
      data: {user},
    });

    dialogRef.afterClosed().subscribe((data) => {
      this.ngOnInit();
    });
  }

  public viewInvoice(user: User) {

    this.orderService.getInvoice(user.id).subscribe({
      next: (data: any) => {
        console.log('view invoice',data);
        this.invoice = data;
        const dialogRef = this.dialog.open(InvoiceModalComponent, {
          width: '1750px',
          data: {user: user, invoice: this.invoice},
        });

        dialogRef.afterClosed().subscribe((data) => {
          this.ngOnInit();
        });
      },
      error: (error: any) => {
        console.error(error);
        this.message = 'No Invoice For Order';
        this.action = 'Close';
        this.snackBar.open(this.message, this.action);
      }
    });
  }

  public makePayment(user: User) {
    console.log(user);

    this.orderService.getInvoice(user.id).subscribe({
      next: (data: any) => {
        console.log('getInvoice',data);
        this.invoice = data;
        const dialogRef = this.dialog.open(PaymentModalComponent, {
          width: '1750px',
          data: {user: user, invoice: this.invoice},
        });

        dialogRef.afterClosed().subscribe((data) => {
          this.ngOnInit();
        });
      },
      error: (error: any) => {
        console.error(error);
        this.message = 'No Invoice For Order';
        this.action = 'Close';
        this.snackBar.open(this.message, this.action);
      }
    });
  }

  public settleAccount(user: User) {
    console.log(user);

    this.orderService.getInvoice(user.id).subscribe({
      next: (data: any) => {
        console.log(data);
        this.invoice = data;
        const dialogRef = this.dialog.open(SettleAccountModalComponent, {
          width: '1750px',
          data: {user: user, invoice: this.invoice},
        });
        dialogRef.afterClosed().subscribe((data) => {
          this.ngOnInit();
        });
      },
      error: (error: any) => {
        console.error(error);
        this.message = 'No Account to Settle';
        this.action = 'Close';
        this.snackBar.open(this.message, this.action);
      }
    });
  }

}
