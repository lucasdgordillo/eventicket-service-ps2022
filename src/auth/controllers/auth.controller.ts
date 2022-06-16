import { Body, Controller, HttpCode, HttpException, HttpStatus, Post, Request } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from 'src/user/models/user.interface';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';
import { Role } from 'src/user/models/role.enum';
import { UserEntity } from 'src/user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) {}

  @Post('register')
  registerUser(@Body() user: User): Observable<any> {
    return this.authService.registerAccount(user)
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() user: User): Observable<{ token: string, role: any }> {
    let userData: UserEntity;
    this.authService.getUserInformation(user.email).then(async (user) => {
      userData = user;
    }).catch(e => {
      throw new HttpException(
        { status: HttpStatus.FORBIDDEN, error: 'Invalid Credentials' },
        HttpStatus.FORBIDDEN,
      );
    });

    return this.authService.login(user).pipe(map((jwt: string) => ({ token: jwt, role: userData.role })));
  }
}
