import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import { carWithIdMock, createCarMock, createWithErrorCarMock } from '../../mocks/mockCars';
import { ZodError } from 'zod';

const { expect } = chai;

describe('Cars service', () => {
	const carModel = new CarModel();
	const carService = new CarService(carModel);

  before(async () => {
    sinon.stub(carModel, 'create').resolves(carWithIdMock);
    sinon.stub(carModel, 'read').resolves([carWithIdMock]);
    sinon.stub(carModel, 'readOne')
      .onCall(0).resolves(carWithIdMock)
  });

  after(()=>{
    sinon.restore();
  })

  describe('Cria um carro', () => {
        it('Sucesso', async () => {
            const carCreated = await carService.create(createCarMock);

            expect(carCreated).to.be.deep.equal(carWithIdMock);
        });

        it('Falha', async () => {
            let err: any;

            try {
                await carService.create(createWithErrorCarMock);
            } catch (error) {
                err = error;
            }

            expect(err).to.be.instanceOf(ZodError);
        })
    })

  describe('Lista Carros', () => {
    it('Verifica se lista todos os carros', async () => {
      const cars = await carService.read();

      expect(cars).to.be.deep.equal([carWithIdMock]);
    })

    it('Lista um carro, conforme seu id', async () => {
      const car = await carService.readOne(carWithIdMock._id);
      // .onCall(0)
      expect(car).to.be.deep.equal(carWithIdMock);
    })
  })
})