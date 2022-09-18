import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import { carWithIdMock, createCarMock } from '../../mocks/mockCars';
import CarModel from '../../../models/CarModel';

const { expect } = chai;

describe('Model Cars', () => {
  const carModel = new CarModel();

  before(async () => {
    sinon.stub(Model, 'create').resolves(carWithIdMock);
    sinon.stub(Model, 'find').resolves([carWithIdMock]);
    sinon.stub(Model, 'findOne').resolves(carWithIdMock);
  });

  after(()=>{
    sinon.restore();
  });

    describe('Cria um carro', () => {
        it('sucesso', async () => {
            const newCar = await carModel.create(createCarMock);
    
            expect(newCar).to.be.deep.eq(carWithIdMock);
        });
    })

    describe('Lista Carros', () => {
        it('Lista todo os carros com sucesso', async () => {
          const cars = await carModel.read();
          expect(cars).to.be.deep.eq([carWithIdMock]);
        });
    
        it('Lista um carro, conforme o seu id', async () => {
          const car = await carModel.readOne('632242cce100cb6a21015928');
          expect(car).to.be.deep.eq(carWithIdMock);
        });
    })
});