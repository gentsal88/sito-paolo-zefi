import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  selector: 'app-admin-dashboard',
  imports: [CommonModule, MatCardModule],
  template: `
    <div class="grid">
      <mat-card>Articles: 123</mat-card>
      <mat-card>Books: 12</mat-card>
      <mat-card>Videos: 34</mat-card>
    </div>
  `,
  styles: ['.grid{display:flex;gap:16px;flex-wrap:wrap}']
})
export class AdminDashboardComponent {}
