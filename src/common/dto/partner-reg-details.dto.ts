import { Exclude, Type } from 'class-transformer';

export class PartnerRegistrationDetailsDto {
  id: any;
  full_name: string;
  mothers_name: string;
  fathers_name: string;
  @Type(() => Date)
  dob: Date;
  @Type(() => Number)
  age: number;
  country?: string;
  present_address: string;
  @Type(() => Number)
  house_number?: number;
  @Type(() => Number)
  road_number?: number;
  permanent_address?: string;
  nid_number?: string;
  bank_name?: string;
  bank_branch?: string;
  bank_account_number?: string;
  bkash_number?: string;
  nagad_number?: string;
  mothers_name_bangla?: string;
  fathers_name_bangla?: string;
  nid_front_photo_url?: string;
  nid_back_photo_url?: string;
  other_id_number?: string;
  other_id_photo_url?: string;
  selfie_photo_url?: string;
  @Exclude()
  email: string;
  @Exclude()
  mobile: string;
}
