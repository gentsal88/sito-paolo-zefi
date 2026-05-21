import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AdminApiService } from '../../core/services/admin-api.service';

@Component({
  standalone: true,
  selector: 'app-admin-videos-list',
  imports: [CommonModule, MatTableModule, MatButtonModule, RouterModule],
  template: `
    <div>
      <div class="toolbar">
        <button mat-flat-button color="primary" routerLink="/admin/videos/new">New Video</button>
      </div>
      <table mat-table [dataSource]="videos()">
        <ng-container matColumnDef="title">
          <th mat-header-cell *matHeaderCellDef>Title</th>
          <td mat-cell *matCellDef="let el">{{el.title}}</td>
        </ng-container>
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let el">
            <button mat-button [routerLink]="['/admin/videos', el.id, 'edit']">Edit</button>
          </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="['title','actions']"></tr>
        <tr mat-row *matRowDef="let row; columns: ['title','actions'];"></tr>
      </table>
    </div>
  `,
  styles: ['.toolbar{display:flex;justify-content:flex-end;margin-bottom:8px}']
})
export class AdminVideosListComponent implements OnInit {
  videos = signal<any[]>([]);

  constructor(private api: AdminApiService) {}

  ngOnInit() {
    this.api.listVideos({ page: 1, limit: 20 }).subscribe(res => {
      const items = Array.isArray(res) ? res : (res as any)?.data ?? [];
      this.videos.set(items || []);
    });
  }
}
