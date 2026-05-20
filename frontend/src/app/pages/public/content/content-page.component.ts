import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ContentService, Story } from '@core/services/content.service';

@Component({
  selector: 'app-content-page',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.scss'],
})
export class ContentPageComponent implements OnInit {
  story: Story | null = null;
  id: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private contentService: ContentService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.loadStory(this.id);
  }

  private loadStory(id: string) {
    this.contentService.getStory(id).subscribe({
      next: (s) => {
        this.story = s ?? null;
      },
      error: (err) => {
        console.error('Error loading story', err);
        // fallback to fetching all stories and find locally
        this.contentService.getStories().subscribe({
          next: (stories) => {
            const found = stories.find((st: any) => String(st.id) === String(id));
            this.story = found ?? null;
          },
          error: (e) => {
            console.error('Fallback load failed', e);
            this.story = null;
          }
        });
      }
    });
  }

  goBack() {
    this.location.back();
  }

  goHome() {
    this.router.navigate(['/']);
  }

  read() {
    if (!this.story) return;
    if ((this.story as any).articleUrl) window.open((this.story as any).articleUrl, '_blank');
  }

  download() {
    if (!this.story) return;
    if ((this.story as any).downloadUrl) window.open((this.story as any).downloadUrl, '_blank');
  }
}
