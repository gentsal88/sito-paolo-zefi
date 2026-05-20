import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PreloaderComponent } from './preloader/preloader.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, HeaderComponent, FooterComponent, PreloaderComponent],
  exports: [HeaderComponent, FooterComponent, PreloaderComponent],
})
export class SharedComponentsModule {}
