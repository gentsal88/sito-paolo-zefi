import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './hero/hero.component';
import { BiografiaComponent } from './biografia/biografia.component';
import { LezhaComponent } from './lezha/lezha.component';
import { GalleriaComponent } from './galleria/galleria.component';
import { PubblicazioniComponent } from './pubblicazioni/pubblicazioni.component';
import { VideoComponent } from './video/video.component';
import { ContattiComponent } from './contatti/contatti.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HeroComponent,
    BiografiaComponent,
    LezhaComponent,
    GalleriaComponent,
    PubblicazioniComponent,
    VideoComponent,
    ContattiComponent,
  ],
  exports: [
    HeroComponent,
    BiografiaComponent,
    LezhaComponent,
    GalleriaComponent,
    PubblicazioniComponent,
    VideoComponent,
    ContattiComponent,
  ],
})
export class HomeSectionsModule {}
