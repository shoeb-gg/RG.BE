import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class PartnerBusinessDetailsDto {
  id: any;
  business_name?: string;
  business_id?: string;
  business_address?: string;
  @Type(() => Date)
  business_start_date?: Date;
  business_mobile?: string;
  trade_licence_photo_url?: string;
  @IsNotEmpty()
  business_type: string;
}
