import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();

    if (request.url.startsWith('/auth')) {
      return next.handle();
    }

    const token = request.headers.authorization;

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    return next.handle();
  }
}
