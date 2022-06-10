import { Body, Controller, HttpCode, HttpStatus, Post, Request } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from 'src/user/models/user.interface';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) {}

  @Post('register')
  registerUser(@Body() user: User, @Request() req): Observable<any> {
    const createdBy = req && req.user ? req.user : null;

    return this.authService.registerAccount(user, createdBy)
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() user: User): Observable<{ token: string }> {
    return this.authService.login(user).pipe(map((jwt: string) => ({ token: jwt })));
  }
}
