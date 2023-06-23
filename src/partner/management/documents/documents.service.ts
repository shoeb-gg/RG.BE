import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { VehicleDocumentsDto } from 'src/common/dto/vehicle-documents.dto';
import { successResponse } from 'src/common/models/res.success';

@Injectable()
export class DocumentsService {
    private readonly primsa = new PrismaClient()

    async createVehicleDocument(partnerId: string, vehicleId: string, documentInfo: VehicleDocumentsDto): Promise<successResponse> {
        const newDocument = plainToClass(VehicleDocumentsDto, documentInfo)
        try {
            await this.primsa.partner_vehicle_documents.create({
                data: {
                    user_id: partnerId,
                    vehicle_id: vehicleId,
                    ...newDocument,
                }
            })
            return {
                message: 'Data Saved Successfully!',
                status: HttpStatus.CREATED,
            };
        } catch (error) {
            console.log(error);
            throw new HttpException('Complete the Form!', HttpStatus.FORBIDDEN);
        }
    }

    //we can use this endpoitns in admin panel . disable for now
    // async allVehicleDocuments(partnerId: string): Promise<VehicleDocumentsDto[]> {
    //     try {
    //         const allDocumentInfo: VehicleDocumentsDto[] = await this.primsa.partner_vehicle_documents.findMany({
    //             where: {
    //                 user_id: partnerId,
    //             },
    //             include:{
    //                 vehicle_reg_details:{
    //                     select:{
    //                         vehicle_brand:true,
    //                         vehicle_number_plate:true
    //                     }
    //                 }
    //             }
    //         })
    //         return allDocumentInfo;
    //     } catch (error) {
    //         console.log(error);
    //         throw new HttpException('Complete the Form!', HttpStatus.FORBIDDEN);
    //     }
    // }

    async singleVehicleDocument(vehicleId: string): Promise<VehicleDocumentsDto> {
        try {
            const vehicleDocument: VehicleDocumentsDto = await this.primsa.partner_vehicle_documents.findUnique({
                where: {
                    vehicle_id: vehicleId
                },
                include: {
                    vehicle_reg_details: {
                        select: {
                            vehicle_brand: true,
                            vehicle_number_plate: true
                        }
                    }
                }
            })
            return vehicleDocument;
        } catch (error) {
            console.log(error);
            throw new HttpException('Complete the Form!', HttpStatus.FORBIDDEN);
        }
    }

    async updateVehicleDocument(documentId: string, documentInfo: VehicleDocumentsDto): Promise<successResponse> {
        const updateDocument = plainToClass(VehicleDocumentsDto, documentInfo)
        try {
            await this.primsa.partner_vehicle_documents.update({
                where: {
                    id: documentId
                },
                data: {
                    ...updateDocument
                }
            })
            return {
                message: 'Data Saved Successfully!',
                status: HttpStatus.CREATED,
            };
        } catch (error) {
            console.log(error);
            throw new HttpException('Complete the Form!', HttpStatus.FORBIDDEN);
        }
    }
}
