import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import { IService } from '../interfaces/IService';

export default class CarController {
  constructor(protected _service: IService<ICar>) {}

  public async create(req: Request, res: Response) {
    const result = await this._service.create(req.body);
    return res.status(201).json(result);
  }

  public async read(req: Request, res: Response) {
    const result = await this._service.read();

    return res.status(200).json(result);
  }
}