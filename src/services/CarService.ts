import { ErrorTypes } from '../errors/catalog';
import { CarZodSchema, ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';

export default class CarService implements IService<ICar> {
  constructor(private model: IModel<ICar>) {

  }

  public async create(obj: ICar): Promise<ICar> {
    const result = CarZodSchema.safeParse(obj);
    if (!result.success) {
      throw result.error;
    }
    return this.model.create(obj);
  }

  public async read(): Promise<ICar[]> {
    return this.model.read();
  }

  public async readOne(_id: string): Promise<ICar | null> {
    const oneCar = await this.model.readOne(_id);
    if (!oneCar) throw new Error(ErrorTypes.EntityNotFound);

    return oneCar;
  }
}