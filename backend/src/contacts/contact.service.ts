import { Injectable, Logger } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  async sendMessage(createContactDto: CreateContactDto) {
    try {
      // TODO: Invia email o salva nel database
      this.logger.log(
        `Nuovo messaggio da ${createContactDto.nome}: ${createContactDto.oggetto}`
      );

      // Per ora, ritorna un successo simulato
      return {
        success: true,
        message: 'Messaggio ricevuto con successo. Risponderemo presto!',
      };
    } catch (error) {
      this.logger.error('Errore durante l\'invio del messaggio:', error);
      return {
        success: false,
        message: 'Errore durante l\'invio del messaggio.',
      };
    }
  }
}
