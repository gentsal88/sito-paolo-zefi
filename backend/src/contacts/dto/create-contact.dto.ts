import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  @MaxLength(200)
  oggetto: string;

  @IsString()
  @MinLength(10)
  @MaxLength(5000)
  messaggio: string;
}
