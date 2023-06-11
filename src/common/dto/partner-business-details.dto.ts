import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class PartnerBusinessDetailsDto {
  id: any;
  @IsNotEmpty()
  business_name: string;
  business_id?: string;
  @IsNotEmpty()
  business_address: string;
  @Type(() => Date)
  business_start_date?: Date;
  @IsNotEmpty()
  business_mobile: string;
  @IsNotEmpty()
  trade_licence_photo_url: string;
}
