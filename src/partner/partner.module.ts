import { Module } from '@nestjs/common';
import { DashboardModule } from './dashboard/dashboard.module';
import { SettingsModule } from './settings/settings.module';
import { FormsModule } from './forms/forms.module';
import { ManagementModule } from './management/management.module';

@Module({
  imports: [DashboardModule, SettingsModule, FormsModule, ManagementModule],
})
export class PartnerModule {}
