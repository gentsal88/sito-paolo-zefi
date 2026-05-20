import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageService } from '@core/services/language.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
  styles: [],
})
export class AppComponent implements OnInit {
  title = 'Sito Paulo Zefi';

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    // Language service initializes automatically
    // This ensures language persistence and browser language detection
  }
}
