import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from 'src/user/models/user.interface';
import { AuthService } from '../services/auth.service';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

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
  login(@Body() user: User): Observable<{ token: string }> {
    return this.authService.login(user).pipe(map((jwt: string) => ({ token: jwt })));
  }
}
