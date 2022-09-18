import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

const CarZodSchema = VehicleZodSchema.extend({
  doorsQty: z.number({
    required_error: 'DoorsQty is required',
    invalid_type_error: 'DoorsQty must be a string',
  }).int().gte(2).lte(4),
  seatsQty: z.number({
    required_error: 'SeatsQty is required',
    invalid_type_error: 'SeatsQty must be a string',
  }).int().gte(2).lte(7),
});

type ICar = z.infer<typeof CarZodSchema>;

export { CarZodSchema, ICar };