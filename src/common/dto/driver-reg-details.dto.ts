import { Type } from 'class-transformer';

export class DriverRegistrationDetailsDto {
  id: any;
  full_name: string;
  @Type(()=>Date)
  dob: Date;
  age: number;
  tenure?: number;
  experience: number;
  license_number: string;
  license_photo_url: string;
  driver_photo_url: string;
}
