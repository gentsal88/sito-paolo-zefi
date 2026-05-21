import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AdminApiService } from '../../core/services/admin-api.service';

@Component({
  standalone: true,
  selector: 'app-admin-video-form',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="save()">
      <mat-form-field appearance="fill"><mat-label>Title</mat-label><input matInput formControlName="title" /></mat-form-field>
      <mat-form-field appearance="fill"><mat-label>YouTube URL</mat-label><input matInput formControlName="youtubeUrl" /></mat-form-field>
      <mat-form-field appearance="fill"><mat-label>Description</mat-label><textarea matInput formControlName="description" rows="6"></textarea></mat-form-field>
      <button mat-flat-button color="primary" type="submit" [disabled]="form.invalid">Save</button>
    </form>
  `,
})
export class AdminVideoFormComponent implements OnInit {
  form: FormGroup;
  id?: number;

  constructor(private api: AdminApiService, private route: ActivatedRoute) {
    this.form = new FormGroup({ title: new FormControl('', Validators.required), youtubeUrl: new FormControl('', Validators.required), description: new FormControl('') });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.id = Number(id);
      this.api.getVideo(this.id).subscribe(a => this.form.patchValue(a));
    }
  }

  save() {
    if (this.id) {
      this.api.updateVideo(this.id, this.form.value).subscribe(() => history.back());
    } else {
      this.api.createVideo(this.form.value).subscribe(() => history.back());
    }
  }
}
