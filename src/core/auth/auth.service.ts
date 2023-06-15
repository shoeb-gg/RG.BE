import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer';

import { PrismaClient } from '@prisma/client';

import { UserDto } from 'src/common/dto/user.dto';
import GenerateOtp from 'src/common/service/otp-generator';
import { HttpService } from '@nestjs/axios';
import { Observable, map } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class AuthService {
  constructor(private JwtService: JwtService, private readonly httpService: HttpService) { }
  private readonly prisma = new PrismaClient();

  async createUser(userInfo: UserDto): Promise<any> {
    const newUser = plainToClass(UserDto, userInfo);

    try {
      await this.prisma.users.create({
        data: newUser,
      });
    } catch (err) {
      return err;
    }

    return true;
  }

  async UserLogin({ id }: UserDto): Promise<any> {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          id: id,
        },
      });
      const payload = { ...user };
      const access_token = this.JwtService.sign(payload);
      return { ...user, access_token };
    } catch (error) {
      throw new NotFoundException('Invalid User Input');
    }
  }

  async GetAllUsers(): Promise<any> {
    const users = this.prisma.users.findMany();
    return users;
  }

  async SendOtp(to: any): Promise<Observable<AxiosResponse<any>>> {
    try {
      const NewGeneratedOtp = GenerateOtp()
      return this.httpService.get(process.env.SMS_API, {
        params: {
          to: to,
          text: "Your Otp Is " + NewGeneratedOtp + " Keep It Secret",
          user: process.env.SMS_USER,
          password: process.env.SMS_PASSWORD
        }
      }).pipe(
        map(response => response.data)
      )
    } catch (error) {
      console.log(error);
    }
  }

  // async GetOtp(phoneNumber:string):Promise<any>{
  //   const NewGeneratedOtp = GenerateOtp()
  //   console.log(phoneNumber);
  //   return NewGeneratedOtp    
  // }

  // async Test(name: any, mobile: any): Promise<any> {
  //   try {
  //     const User = await this.prisma.users.create({
  //       data: {
  //         full_name: name,
  //         type: "user"
  //       }
  //     })
  //     const UserAccount = await this.prisma.account_details.create({
  //       data: {
  //         mobile: mobile,
  //         email: "khsagar0512@gmail.com",
  //         users: {
  //           connect: { id: User.id }
  //         },
  //       }
  //     })
  //     return { User: { User }, UserAccount: { UserAccount } }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async TestSms(): Promise<Observable<AxiosResponse<any, any>>> {
  //   // const url = 'https://panel.smsbangladesh.com/balance?user=babu77bd@gmail.com&password=Rgsb@059'
  //   try {

  //     return this.httpService.get('https://panel.smsbangladesh.com/balance?user=babu77bd@gmail.com&password=Rgsb@059').pipe(
  //       map(response => response.data)
  //     )
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
}
