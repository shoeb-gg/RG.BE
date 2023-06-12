import { Exclude, Type } from 'class-transformer';

export class AccountDetailsDto {
  id: any;
  @Exclude()
  full_name?: string;
  mobile: string;
  email: string;
  @Type(() => Date)
  dob?: Date;
  present_address?: string;
  country?: string;
  photo_url?: string;
  @Type(() => Boolean)
  form_completed?: boolean;
  @Type(() => Boolean)
  account_verified?: boolean;
}
