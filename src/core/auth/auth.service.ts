import { HttpException, HttpStatus, Injectable, NotFoundException, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer';

import { PrismaClient } from '@prisma/client';

import { UserDto } from 'src/common/dto/user.dto';
import GenerateOtp from 'src/core/otp/otp-generator';
import { HttpService } from '@nestjs/axios';
import { Observable, map } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class AuthService {
  constructor(
    private JwtService: JwtService,
    private readonly httpService: HttpService,
  ) {}
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
      const NewGeneratedOtp = GenerateOtp();
      return this.httpService
        .get(process.env.SMS_API, {
          params: {
            to: to,
            text: 'Your Otp Is ' + NewGeneratedOtp + ' Keep It Secret',
            user: process.env.SMS_USER,
            password: process.env.SMS_PASSWORD,
          },
        })
        .pipe(map((response) => response.data));
    } catch (error) {
      console.log(error);
    }
  }

  // async UserRegistrationOtpSend(to: any, full_name: string): Promise<any> {
  //   const NewGeneratedOtp = GenerateOtp()
  //   try {
  //     const mobileNumberCheck = await this.prisma.account_details.findFirst({
  //       where: {
  //         mobile: to
  //       }
  //     })
  //     if (!mobileNumberCheck) {
  //       await this.prisma.otp.create({
  //         data: {
  //           otp_code: NewGeneratedOtp,
  //           mobile: to
  //         },
  //       })
  //       return this.httpService
  //         .get(process.env.SMS_API, {
  //           params: {
  //             to: to,
  //             text: 'Your Otp Is ' + NewGeneratedOtp + ' Keep It Secret',
  //             user: process.env.SMS_USER,
  //             password: process.env.SMS_PASSWORD,
  //           },
  //         })
  //         .pipe(map((response) => response.data));
  //     } else {
  //       return false
  //     }
  //   } catch (error) {
  //     throw new HttpException('Error From API', HttpStatus.FORBIDDEN);
  //   }
  // }

  async UserRegistrationOtpSend(to: any, full_name: string): Promise<any> {
    //generate otp code
    const NewGeneratedOtp = GenerateOtp()
    try {
      //check mobile number in account db. if mobile number exist or not . If mobile number exist we are not gonna let them register. cause they are gonna log in
      const mobileNumberCheck = await this.prisma.account_details.findFirst({
        where: {
          mobile: to
        }
      })
      //check mobile number in otp db. if mobile number exist or not . cause we are gonna update row, based on unique phone number
      const mobileCheckInOtp = await this.prisma.otp.findUnique({
        where:{
          mobile:to
        }
      })
      //check if mobile number in account and otp is not exits then
      if (!mobileNumberCheck && !mobileCheckInOtp) {
        await this.prisma.otp.create({
          data: {
            otp_code: NewGeneratedOtp,
            mobile: to
          },
        })
        //send sms with otp to mobile number
        return this.httpService
          .get(process.env.SMS_API, {
            params: {
              to: to,
              text: 'Your Otp Is ' + NewGeneratedOtp + ' Keep It Secret',
              user: process.env.SMS_USER,
              password: process.env.SMS_PASSWORD,
            },
          })
          .pipe(map((response) => response.data));
      } else if(mobileCheckInOtp){
        //if mobile number exist in otp db , we are gonna update the otp code or it will conflict for unique mobile 
       await this.prisma.otp.update({
        where:{
          mobile:to
        },
        data:{
          otp_code:NewGeneratedOtp
        }
       })
       return this.httpService
          .get(process.env.SMS_API, {
            params: {
              to: to,
              text: 'Your Otp Is ' + NewGeneratedOtp + ' Keep It Secret',
              user: process.env.SMS_USER,
              password: process.env.SMS_PASSWORD,
            },
          })
          .pipe(map((response) => response.data));
      }
      else{
        //If number found in account db then we are throwing error to login 
        return {message:"User Exist . Please Login"}
      }
    } catch (error) {
      throw new HttpException('Account Exist Or Server Error Try Again', HttpStatus.FORBIDDEN);
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
