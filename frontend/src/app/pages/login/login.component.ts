import { Component, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h1>{{ 'login.title' | translate }}</h1>
        <p class="subtitle">{{ 'login.description' | translate }}</p>
        <form (ngSubmit)="onLogin()">
          <div class="form-group">
            <label for="email">{{ 'common.email' | translate }}:</label>
            <input
              type="email"
              id="email"
              name="email"
              [(ngModel)]="email"
              [placeholder]="'login.email_placeholder' | translate"
              required
            />
          </div>

          <div class="form-group">
            <label for="password">{{ 'common.password' | translate }}:</label>
            <input
              type="password"
              id="password"
              name="password"
              [(ngModel)]="password"
              [placeholder]="'login.password_placeholder' | translate"
              required
            />
          </div>

          <button type="submit" [disabled]="isLoading()">
            @if (isLoading()) {
              {{ 'login.logging_in' | translate }}
            } @else {
              {{ 'login.login_button' | translate }}
            }
          </button>

          @if (errorMessage()) {
            <div class="error-message">{{ errorMessage() }}</div>
          }
        </form>
      </div>
    </div>
  `,
  styles: [
    `
      .login-container {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }

      .login-card {
        background: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        width: 100%;
        max-width: 400px;
      }

      h1 {
        text-align: center;
        margin-bottom: 0.5rem;
        color: #333;
      }

      .subtitle {
        text-align: center;
        color: #666;
        font-size: 14px;
        margin-bottom: 2rem;
      }

      .form-group {
        margin-bottom: 1.5rem;
      }

      label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 600;
        color: #555;
      }

      input {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 1rem;
        box-sizing: border-box;

        &:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
      }

      button {
        width: 100%;
        padding: 0.75rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }

        &:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
      }

      .error-message {
        margin-top: 1rem;
        padding: 0.75rem;
        background-color: #fee;
        color: #c33;
        border: 1px solid #fcc;
        border-radius: 4px;
        text-align: center;
      }
    `,
  ],
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  isLoading = signal(false);
  errorMessage = signal('');

  constructor(
    private authService: AuthService,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    // Component initialized
  }

  onLogin(): void {
    if (!this.email || !this.password) {
      this.translate.get('validation.required').subscribe((text: string) => {
        this.errorMessage.set(text);
      });
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        this.isLoading.set(false);
        this.router.navigate(['/admin']);
      },
      error: (error) => {
        this.isLoading.set(false);
        const errorKey = error.error?.message ? 'login.error_invalid' : 'login.error_server';
        this.translate.get(errorKey).subscribe((text: string) => {
          this.errorMessage.set(text);
        });
      },
    });
  }
}

