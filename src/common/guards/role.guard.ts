import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { Request } from 'express';
import { User } from '../../users/models/user.model';
import { UserRole } from '../enums/user-role.enum';

export const RoleGuard = (...roles: UserRole[]): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      if (!roles) return true;

      const request = context.switchToHttp().getRequest<Request>();
      const user = request.user as User;

      return roles.some((e) => user.role.name === e);
    }
  }

  const guard = mixin(RoleGuardMixin);
  return guard;
};
