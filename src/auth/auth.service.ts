import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.get(
      {
        where: { username },
      },
      ['withRole'],
    );
    if (user && user.comparePasswordSync(password)) {
      const result = user.toJSON();
      delete result.password;
      return result;
    }
    return null;
  }

  async validateJwt(id: string): Promise<any> {
    return this.usersService.get(
      {
        where: { id },
      },
      ['withoutPassword', 'withRole'],
    );
  }

  async login(user: any): Promise<any> {
    if (!user) {
      throw new UnauthorizedException();
    }
    return {
      user,
      accessToken: this.jwtService.sign({ id: user.id }),
    };
  }
}
