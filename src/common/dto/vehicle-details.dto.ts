import { Type } from 'class-transformer';

export class VehicleDetailsDto {
  id: string;
  vehicle_type: string;
  vehicle_brand: string;
  vehicle_model: string;
  vehicle_number_plate: string;
  @Type(() => Number)
  year: number;
  color: string;
  @Type(() => Number)
  number_of_seats: number;
  engine_type: string;
  @Type(() => Number)
  mileage: number;
  condition: string;
  vehicle_front_photo_url: string;
  vehicle_back_photo_url: string;
  vehicle_left_photo_url: string;
  vehicle_right_photo_url: string;
  vehicle_interior_photo_url: string;
}
