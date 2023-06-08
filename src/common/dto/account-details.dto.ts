export class AccountDetailsDto {
  id: any;
  mobile?: string;
  email?: string;
  dob?: Date;
  present_address?: string;
  country?: string;
  photo_url?: string;
  form_completed: Boolean;
  account_verified: Boolean;
}
