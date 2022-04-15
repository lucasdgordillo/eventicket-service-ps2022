import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UserEntity } from 'src/user/entities/user.entity';
import { User } from 'src/user/models/user.interface';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) 
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService
  ) {}
  
  hashPassword(password: string): Observable<string> {
    return from(bcrypt.hash(password, 12));
  }

  registerAccount(user: User): Observable<any> {
    const { email, password, role, firstName, lastName, dniNumber, phoneNumber } = user;

    return this.hashPassword(password).pipe(
      switchMap((hashedPassword: string) => {
        return from(this.userRepository.save({
          email: email,
          password: hashedPassword,
          firstName: firstName,
          lastName: lastName,
          role: role,
          dniNumber: dniNumber,
          phoneNumber: phoneNumber
        })).pipe(
          map((user: User) => {
            delete user.password;
            return { success: 'ok', email: user.email, role: user.role };
          })
        )
      })
    )
  }

  validateUser(email: string, password: string): Observable<User> {
    return from(
      this.userRepository.findOne({
        select: ['id', 'email', 'password', 'role', 'firstName', 'lastName', 'dniNumber', 'phoneNumber'],
        where: { email }}
      )
    ).pipe(
      switchMap((user: User) => {
        if (!user) {
          throw new HttpException(
            { status: HttpStatus.FORBIDDEN, error: 'Invalid Credentials' },
            HttpStatus.FORBIDDEN,
          );
        }
        return from(bcrypt.compare(password, user.password)).pipe(
          map((isValidPassword: boolean) => {
            if (isValidPassword) {
              delete user.password;
              return user;
            }
          }),
        );
      }),
    );
  }

  login(user: User): Observable<string> {
    const { email, password } = user;
    return this.validateUser(email, password).pipe(
      switchMap((user: User) => {
        if (user) {
          return from(this.jwtService.signAsync({ user }));
        }
      }),
    );
  }
}
