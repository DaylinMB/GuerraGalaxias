import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService } from '@app/services/account.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent implements OnInit {
    form!: FormGroup;
    loading = false;
    submitted = false;
    error?: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService
    ) {
        if (this.accountService.userValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alert on submit
        this.error = '';

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.register(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.router.navigate(['/account/login'], { queryParams: { registered: true }});
                },
                error: error => {
                    this.error = error;
                    this.loading = false;
                }
            });
    }
}









// import { Component, OnInit } from '@angular/core';
// import { Router, ActivatedRoute } from '@angular/router';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { first } from 'rxjs/operators';

// import { AccountService } from '@app/services/account.service';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-register',
//   standalone: true,
//   imports: [ CommonModule, ReactiveFormsModule],
//   templateUrl: './register.component.html',
//   styleUrl: './register.component.css'
// })

// export class RegisterComponent implements OnInit {
//     form!: FormGroup;
//     loading = false;
//     submitted = false;
//     error?: string;

//     constructor(
//         private formBuilder: FormBuilder,
//         private route: ActivatedRoute,
//         private router: Router,
//         private accountService: AccountService
//     ) {
//         if (this.accountService.userValue) {
//             this.router.navigate(['/']);
//         }
//     }

//     ngOnInit() {
//         this.form = this.formBuilder.group({
//             firstName: ['', Validators.required],
//             lastName: ['', Validators.required],
//             username: ['', Validators.required],
//             password: ['', [Validators.required, Validators.minLength(6)]]
//         });
//     }

//     // convenience getter for easy access to form fields
//     get f() { return this.form.controls; }

//     onSubmit() {
//         this.submitted = true;

//         // reset alert on submit
//         this.error = '';

//         // stop here if form is invalid
//         if (this.form.invalid) {
//             return;
//         }

//         this.loading = true;
//         this.accountService.register(this.form.value)
//             .pipe(first())
//             .subscribe({
//                 next: () => {
//                     this.router.navigate(['/account/login'], { queryParams: { registered: true }});
//                 },
//                 error: error => {
//                     this.error = error;
//                     this.loading = false;
//                 }
//             });
//     }
// }