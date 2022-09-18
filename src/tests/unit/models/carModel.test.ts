import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import CarModel from '../../../models/CarModel';
import { carWithIdMock, createCarMock } from '../../mocks/mockCars';

const { expect } = chai;

describe('Model Cars', () => {
    const carModel = new CarModel();

    before(async ()=> {
        sinon.stub(Model, 'create').resolves(carWithIdMock);
    });

    after(() => {
        sinon.restore();
    })

    describe('Cria um carro', () => {
        it('sucesso', async () => {
            const newCar = await carModel.create(createCarMock);
    
            expect(newCar).to.be.deep.eq(carWithIdMock);
        });
    })
});