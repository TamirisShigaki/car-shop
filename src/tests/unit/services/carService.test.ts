import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import { carWithIdMock, createCarMock, createWithErrorCarMock } from '../../mocks/mockCars';
import { ZodError } from 'zod';

const { expect } = chai;

describe('Service Cars', () => {
    const carModel = new CarModel();
    const carService = new CarService(carModel);

    before(async () =>{ 
    sinon.stub(carModel, 'create').resolves(carWithIdMock);
    });

    after(() => {
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
})