import { Type } from 'class-transformer';

export class DriverRegistrationDetailsDto {
  id: any;
  full_name: string;
  @Type(() => Date)
  dob: Date;
  @Type(() => Number)
  age: number;
  @Type(() => Number)
  experience: number;
  license_photo_url: string;
  driver_photo_url: string;
}
