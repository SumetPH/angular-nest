import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @MinLength(6)
  passwordConfirm: string;
}

export class LoginDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}
