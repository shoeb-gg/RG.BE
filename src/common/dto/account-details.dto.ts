import { Exclude, Type } from 'class-transformer';
import { isEmail, isNotEmpty, isString } from 'class-validator';

export class AccountDetailsDto {
  id: any;
  @Exclude()
  full_name?: string;
  @Type(()=>isNotEmpty)
  mobile: string;
  @Type(()=>isNotEmpty)
  @Type(()=>isEmail)
  email: string;
  @Type(() => Date)
  dob?: Date;
  @Type(()=>isNotEmpty)
  present_address?: string;
  @Type(()=>isString)
  country?: string;
  photo_url?: string;
  @Type(() => Boolean)
  form_completed?: boolean;
  @Type(() => Boolean)
  account_verified?: boolean;
}
