import { model as mongooseCreateModel, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import MongoModel from './mongoModel';

const carMongoSchema = new Schema<ICar>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
});

class CarModel extends MongoModel<ICar> {
  constructor(model = mongooseCreateModel('Car', carMongoSchema)) {
    super(model);
  }
}

export default CarModel;