import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

import { AppConfig } from '@/core/config/config';

export function AdminRoute() {
  return UseGuards(AdminRouteGuard);
}

@Injectable()
export class AdminRouteGuard implements CanActivate {
  private readonly adminSecret;

  constructor(private readonly appConfig: AppConfig) {
    this.adminSecret = appConfig.env.ADMIN_SECRET;
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!this.adminSecret || authHeader !== this.adminSecret) {
      throw new ForbiddenException();
    }

    return true;
  }
}
