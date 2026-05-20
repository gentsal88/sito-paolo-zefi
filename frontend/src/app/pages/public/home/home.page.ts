import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from '@shared/components/header/header.component';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { PreloaderComponent } from '@shared/components/preloader/preloader.component';
import { HeroComponent } from '@pages/public/home/sections/hero/hero.component';
import { BiografiaComponent } from '@pages/public/home/sections/biografia/biografia.component';
import { LezhaComponent } from '@pages/public/home/sections/lezha/lezha.component';
import { GalleriaComponent } from '@pages/public/home/sections/galleria/galleria.component';
import { PubblicazioniComponent } from '@pages/public/home/sections/pubblicazioni/pubblicazioni.component';
import { VideoComponent } from '@pages/public/home/sections/video/video.component';
import { ContattiComponent } from '@pages/public/home/sections/contatti/contatti.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    HeaderComponent,
    FooterComponent,
    PreloaderComponent,
    HeroComponent,
    BiografiaComponent,
    LezhaComponent,
    GalleriaComponent,
    PubblicazioniComponent,
    VideoComponent,
    ContattiComponent
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomeComponent {}
