import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private db: DatabaseService,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterDto) {
    try {
      const checkEmail = await this.db
        .knex<{ email: string }>('user')
        .select('*')
        .where('email', data.email)
        .first();

      if (checkEmail) {
        throw new HttpException('email already exists', 400);
      }

      const passwordHash = await bcrypt.hash(data.password, 10);

      await this.db.knex('user').insert({
        name: data.name,
        email: data.email,
        password: passwordHash,
      });

      return {
        message: 'User created successfully',
        user: {
          name: data.name,
          email: data.email,
        },
      };
    } catch (error) {
      console.error(error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  async login(data: LoginDto) {
    try {
      const user = await this.db
        .knex<{
          id: number;
          name: string;
          email: string;
          password: string;
          createdAt: string;
        }>('user')
        .select('*')
        .where('email', data.email)
        .first();

      if (!user) {
        throw new HttpException('user and password invalid', 400);
      }

      const checkPassword = await bcrypt.compare(data.password, user.password);

      if (!checkPassword) {
        throw new HttpException('user and password invalid', 400);
      }

      const token = await this.jwtService.signAsync({
        id: user.id,
        name: user.name,
        email: user.email,
      });

      return {
        message: 'Login successful',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          token: token,
        },
      };
    } catch (error) {
      console.error(error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException((error as Error).message);
    }
  }
}
