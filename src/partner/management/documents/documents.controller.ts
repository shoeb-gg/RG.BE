import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { VehicleDocumentsDto } from 'src/common/dto/vehicle-documents.dto';
import { User } from 'src/common/decorators/user.decorator';
import { Roles } from 'src/core/jwt-roles/roles.decorator';
import { JwtAuthGuard } from 'src/core/jwt-roles/jwt-auth.guard';
import { RoleGuard } from 'src/core/jwt-roles/roles.guard';

@Controller('documents')
export class DocumentsController {
    constructor(private readonly documentService: DocumentsService) { }

    @Roles('user')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Post('/:vehicleId')
    async createVehicleDocument(@User() user, @Param('vehicleId') vehicleId: string, @Body() documentInfo: VehicleDocumentsDto): Promise<any> {
        return this.documentService.createVehicleDocument(user.userId, vehicleId, documentInfo)
    }

    //we can use this endpoitns in admin panel . disable for now
    // @Roles('user')
    // @UseGuards(JwtAuthGuard, RoleGuard)
    // @Get('/all')
    // async allVehicleDocuments(@User() user): Promise<any> {
    //     return this.documentService.allVehicleDocuments(user.userId)
    // }

    @Roles('user')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Get('/:vehicleId')
    async singleVehicleDocument(@Param('vehicleId') vehicleId: string): Promise<any> {
        return this.documentService.singleVehicleDocument(vehicleId)
    }

    @Roles('user')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Put('/:documentId')
    async updateVehicleDocument(@Param('documentId') documentId: string, @Body() documentInfo: VehicleDocumentsDto): Promise<any> {
        return this.documentService.updateVehicleDocument(documentId, documentInfo)
    }
}
