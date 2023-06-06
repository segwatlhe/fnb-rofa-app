import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RegistrationService} from "../../service/registration.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-registration-modal',
  templateUrl: './registration-modal.component.html',
  styleUrls: ['./registration-modal.component.css']
})
export class RegistrationModalComponent {
  registrationForm!: FormGroup;
  message: string | undefined;
  action: string | undefined;

  constructor(private registrationService: RegistrationService,
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              private router: Router,
              public dialogRef: MatDialogRef<RegistrationModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.buildRegistrationFrom();
  }

  buildRegistrationFrom() {
    this.registrationForm = this.formBuilder.group({
        fullName: new FormControl('', Validators.required),
        idNumber: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        contactNumber: new FormControl('', [Validators.minLength(10), Validators.maxLength(10)]),
      }
    );
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.registrationService.registerUser(this.registrationForm.value).subscribe({
          next: (data: any) => {
            this.message = 'Registration Successful';
            this.action = 'Close';
            this.snackBar.open(this.message, this.action, {duration: 60000, panelClass: ['custom-style']});
          },
          error: (error: any) => {
            console.error('data', error);
            this.message = 'Registration Unsuccessful';
            this.action = 'Close';
            this.snackBar.open(this.message, this.action, {duration: 60000, panelClass: ['custom-style']});
          },
          complete: () => {
            this.ngOnInit();
          }
        }
      );
    }
  }

}
