import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { PrismaClient } from '@prisma/client';

import GenerateOtp from 'src/core/otp/otp-generator';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private JwtService: JwtService,
    private readonly httpService: HttpService,
  ) {}
  private readonly prisma = new PrismaClient();

  async GetAllUsers(): Promise<any> {
    const users = this.prisma.users.findMany();
    return users;
  }

  //User Registration with mobile number . Then Send Otp and save to db
  async UserRegistrationOtpSend(to: any, full_name: string): Promise<any> {
    //generate otp code
    const NewGeneratedOtp = GenerateOtp();
    try {
      //check mobile number in account db. if mobile number exist or not . If mobile number exist we are not gonna let them register. cause they are gonna log in
      const mobileNumberCheck = await this.prisma.account_details.findFirst({
        where: {
          mobile: to,
        },
      });
      //check mobile number in otp db. if mobile number exist or not . cause we are gonna update row, based on unique phone number
      const mobileCheckInOtp = await this.prisma.otp.findUnique({
        where: {
          mobile: to,
        },
      });
      //check if mobile number in account and otp is not exits then
      //first use to check mobile number in account strictly for best output result.
      if (mobileNumberCheck) {
        return { message: 'User Exist . Please Login' };
      } else if (!mobileNumberCheck && !mobileCheckInOtp) {
        await this.prisma.otp.create({
          data: {
            otp_code: NewGeneratedOtp,
            mobile: to,
          },
        });
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
      } else if (mobileCheckInOtp) {
        //if mobile number exist in otp db , we are gonna update the otp code or it will conflict for unique mobile
        await this.prisma.otp.update({
          where: {
            mobile: to,
          },
          data: {
            otp_code: NewGeneratedOtp,
          },
        });
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
      } else {
        return { message: 'Try Registration First' };
      }
    } catch (error) {
      throw new HttpException(
        'Account Exist Or Invalid Otp',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  //Verify register user's otp and save to system
  async VerifyOtpAndRegister(mobile: any, name: any, otp: any): Promise<any> {
    try {
      //take user input otp first
      const userInputOtp = otp;
      //check mobile number's row for otp
      const mobileNumberheckInOtp = await this.prisma.otp.findUnique({
        where: {
          mobile: mobile,
        },
      });
      //check otp_code === use input otp
      const cheeckAndVerifyOtp =
        userInputOtp === mobileNumberheckInOtp.otp_code;
      //if otp matched =>
      if (cheeckAndVerifyOtp) {
        //create user in db
        const createUser = await this.prisma.users.create({
          data: {
            full_name: name,
            type: 'user',
          },
        });
        //create user account
        const createUserAccount = await this.prisma.account_details.create({
          data: {
            users: {
              connect: { id: createUser.id },
            },
            mobile: mobile,
            email: ' ',
          },
        });
        //if user and account create successfully , we are going to delete our otp from db . or it will cause unnacessary storage issue
        if (createUser && createUserAccount) {
          await this.prisma.otp.delete({
            where: {
              id: mobileNumberheckInOtp.id,
            },
          });
          //Here, we collect user mobile + email + type to generate jwt token . type for check user type to use in auth guard
          const mobile = createUserAccount.mobile;
          const email = createUserAccount.email;
          const type = createUser.type;
          const payload = { mobile, email, type };
          //jwt token generate
          const access_token = this.JwtService.sign(payload);
          return {
            createUser,
            access_token,
          };
        } else {
          return false;
        }
      } else {
        return { message: 'Wrong Otp' };
      }
    } catch (error) {
      throw new HttpException(
        'Server Error! Try Again',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }

  //User login api with otp
  async UserLoginOtpSend(to: any): Promise<any> {
    const NewGeneratedOtp = GenerateOtp();
    try {
      const mobileNumberCheck = await this.prisma.account_details.findFirst({
        where: {
          mobile: to,
        },
      });
      const mobileCheckInOtp = await this.prisma.otp.findUnique({
        where: {
          mobile: to,
        },
      });
      if (!mobileNumberCheck) {
        return { message: 'User Not Registered . Please Register First' };
      } else if (mobileNumberCheck && !mobileCheckInOtp) {
        await this.prisma.otp.create({
          data: {
            otp_code: NewGeneratedOtp,
            mobile: to,
          },
        });
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
      } else if (mobileCheckInOtp) {
        await this.prisma.otp.update({
          where: {
            mobile: to,
          },
          data: {
            otp_code: NewGeneratedOtp,
          },
        });
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
    } catch (error) {
      throw new HttpException(' Server Error Try Again', HttpStatus.FORBIDDEN);
    }
  }

  //otp verification for login
  async VerifyOtpAndLogin(mobile: any, otp: any): Promise<any> {
    try {
      //take user input otp first
      const userInputOtp = otp;
      //check mobile number's row for otp
      const mobileNumberheckInOtp = await this.prisma.otp.findUnique({
        where: {
          mobile: mobile,
        },
      });
      //check otp_code === use input otp
      const cheeckAndVerifyOtp =
        userInputOtp === mobileNumberheckInOtp.otp_code;
      //if otp matched =>
      if (cheeckAndVerifyOtp) {
        //delete otp first
        await this.prisma.otp.delete({
          where: {
            id: mobileNumberheckInOtp.id,
          },
        });
        //fetch user account details based on mobile number
        const UserData = await this.prisma.account_details.findFirst({
          where: {
            mobile: mobile,
          },
          include: {
            users: true,
          },
        });
        //Here, we collect user mobile + email + type to generate jwt token . type for check user type to use in auth guard
        const userId = UserData.user_id;
        const mobileNumber = UserData.mobile;
        const email = UserData.email;
        const type = UserData.users.type;
        const payload = { userId, mobileNumber, email, type };
        //jwt token generate
        const access_token = this.JwtService.sign(payload);
        return {
          message: `Hello ${UserData.users.full_name} Welcome`,
          UserData,
          access_token,
        };
      } else {
        return false;
      }
    } catch (error) {
      throw new HttpException(
        'Account Exist Or Server Error Try Again',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async LoggedInUser(user: any): Promise<any> {
    return await this.prisma.users.findUnique({
      where: {
        id: user.userId,
      },
    });
  }
}
