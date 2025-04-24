import { Request } from 'express';
import { JwtPayload } from 'src/auth/dto/jwt.dto';

declare module 'express' {
  interface Request {
    user?: JwtPayload;
  }
}
