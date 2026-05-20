import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ContactService } from '@core/services/contact.service';

@Component({
  selector: 'app-contatti',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './contatti.component.html',
  styleUrls: ['./contatti.component.scss'],
})
export class ContattiComponent implements OnInit {
  form = {
    nome: '',
    email: '',
    oggetto: '',
    messaggio: '',
  };

  formStatus = signal<any>(null);
  isLoading = signal(false);

  constructor(
    private contactService: ContactService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    // Component initialized
  }

  onSubmit() {
    if (this.form.nome && this.form.email && this.form.messaggio && this.form.oggetto) {
      this.isLoading.set(true);

      this.contactService.sendMessage(this.form).subscribe({
        next: (response) => {
          this.isLoading.set(false);
          this.translate
            .get('sections.contatti.message_sent')
            .subscribe((message: string) => {
              this.formStatus.set({
                success: true,
                message: response.message || message,
              });
            });
          this.form = { nome: '', email: '', oggetto: '', messaggio: '' };
          setTimeout(() => this.formStatus.set(null), 5000);
        },
        error: (error) => {
          this.isLoading.set(false);
          this.translate
            .get('sections.contatti.message_error')
            .subscribe((message: string) => {
              this.formStatus.set({
                success: false,
                message: message,
              });
            });
          setTimeout(() => this.formStatus.set(null), 5000);
        },
      });
    }
  }
}
