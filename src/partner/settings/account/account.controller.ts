import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { AccountService } from './account.service';
import { PartnerRegistrationDetailsDto } from 'src/common/dto/partner-reg-details.dto';
import { PartnerBusinessDetailsDto } from 'src/common/dto/partner-business-details.dto';

@ApiTags('Account Settings')
@Controller('settings/account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}
}
