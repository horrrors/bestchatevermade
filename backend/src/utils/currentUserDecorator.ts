import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '../../src/modules/user/models/user.entity';

export const User = createParamDecorator((_, ctx: ExecutionContext): UserEntity => {
  const req = ctx.switchToHttp().getRequest()
  return req.user
});