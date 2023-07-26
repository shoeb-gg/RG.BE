import { Controller, UseGuards, Get } from '@nestjs/common';

import { User } from 'src/common/decorators/user.decorator';
import { RoleGuard } from 'src/core/jwt-roles/roles.guard';
import { Roles } from 'src/core/jwt-roles/roles.decorator';
import { JwtAuthGuard } from 'src/core/jwt-roles/jwt-auth.guard';

import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';

import { InitService } from './init.service';

@Controller('management')
@ApiTags('Management')
export class InitController {
  constructor(private readonly initService: InitService) {}

  @Roles('user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('total-vehicles')
  async getTotalVehicles(@User() user): Promise<number> {
    return await this.initService.getTotalVehicles(user.userId);
  }

  @Roles('user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('total-drivers')
  async getTotalDrivers(@User() user): Promise<number> {
    return await this.initService.getTotalDrivers(user.userId);
  }
}
