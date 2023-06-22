import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const requiredStatues = this.reflector.get<string[]>('statuses', ctx.getHandler());
    if (!requiredStatues) return true;

    const { user } = ctx.switchToHttp().getRequest();
    return requiredStatues.some((status) => user.status.includes(status));
  }
}
