import { HttpStatus } from '@nestjs/common';

export class successResponse {
  message: string;
  status: HttpStatus;
}
