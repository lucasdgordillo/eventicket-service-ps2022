import { Body, Controller, Get, HttpException, Param, Put, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { User } from '../models/user.interface';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(
    private usersService: UserService
  ) {}

  @UseGuards(JwtGuard)
  @Get('/by-creator-id')
  async getUsersByCreatorId(@Request() req) {
    return this.usersService.getAllUsersByCreatorId(req.user).then(async (users) => {
      return { data: users };
    }).catch(e => {
      throw new HttpException(e.response, e.status);
    });
  }

  @UseGuards(JwtGuard)
  @Get('/productor-users')
  async getProductorUsers() {
    return this.usersService.getAllProductorUsers().then(async (users) => {
      return { data: users };
    }).catch(e => {
      throw new HttpException(e.response, e.status);
    });
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  async updateUserInformation(@Param('id') id: number, @Body() newData: User) {
    return this.usersService.update(id, newData).then(async () => {
      return { message: 'Update Success' };
    }).catch(e => {
      throw new HttpException(e.response, e.status);
    });
  }

  @UseGuards(JwtGuard)
  @Get('/user-data')
  async getUserInfo(@Request() req) {
    return this.usersService.getUserInformation(req.user).then(async (userInfo) => {
      return { data: userInfo };
    }).catch(e => {
      throw new HttpException(e.response, e.status);
    });
  }
}
