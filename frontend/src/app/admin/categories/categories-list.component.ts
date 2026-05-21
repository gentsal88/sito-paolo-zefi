import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AdminApiService } from '../../core/services/admin-api.service';

@Component({
  standalone: true,
  selector: 'app-admin-categories-list',
  imports: [CommonModule, MatTableModule, MatButtonModule, RouterModule],
  template: `
    <div>
      <div class="toolbar">
        <button mat-flat-button color="primary" routerLink="/admin/categories/new">New Category</button>
      </div>
      <table mat-table [dataSource]="categories()">
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Name</th>
          <td mat-cell *matCellDef="let el">{{el.name}}</td>
        </ng-container>
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let el">
            <button mat-button [routerLink]="['/admin/categories', el.id, 'edit']">Edit</button>
          </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="['name','actions']"></tr>
        <tr mat-row *matRowDef="let row; columns: ['name','actions'];"></tr>
      </table>
    </div>
  `,
  styles: ['.toolbar{display:flex;justify-content:flex-end;margin-bottom:8px}']
})
export class AdminCategoriesListComponent implements OnInit {
  categories = signal<any[]>([]);

  constructor(private api: AdminApiService) {}

  ngOnInit() {
    this.api.listCategories().subscribe(res => {
      const items = Array.isArray(res) ? res : (res as any)?.data ?? [];
      this.categories.set(items || []);
    });
  }
}
