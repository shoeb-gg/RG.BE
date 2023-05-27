export class PartnerBusinessDetailsDto {
  id: any;
  business_name: string;
  business_id: string;
  business_address: string;
  business_start_date: Date;
  business_mobile: string;
  //   user_id: string;
  //   Users               users?    @relation(fields: [user_id], references: [id], onDelete: Cascade, onUpdate: NoAction)
}
