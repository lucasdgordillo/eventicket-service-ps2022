import { Controller, Get, HttpException, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(
    private usersService: UserService
  ) {}

  @UseGuards(JwtGuard)
  @Get()
  async getUsersByCreatorId(@Request() req) {
    return this.usersService.getAllUsersByCreatorId(req.user).then(async (users) => {
      return { data: users };
    }).catch(e => {
      throw new HttpException(e.response, e.status);
    });
  }
}
