export class CreateUserDto {
  email: string;
  password: string;
  role: string;
}

export class UserResponseDto {
  id: string;
  email: string;
  role: string;
  isActive: boolean;
}
