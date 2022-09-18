import * as sinon from 'sinon';
import chai from 'chai';
import { Request, Response } from 'express';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import CarController from '../../../controllers/CarController';
import { carWithIdMock, createCarMock } from '../../mocks/mockCars';

const { expect } = chai;

describe('Cars controller', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService)
  // req vai ser um objeto com cast de Request, pois o controller só aceita um Request como primeiro parâmetro
  const req = {} as Request;
  const res = {} as Response;

  before(async () => {
    sinon.stub(carService, 'create').resolves(carWithIdMock);
    sinon.stub(carService, 'read').resolves([carWithIdMock]);
    sinon.stub(carService, 'readOne').resolves(carWithIdMock);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(()=>{
    sinon.restore();
  });

  describe('Create a car', () => {
    it('successfully', async () => {
      req.body = createCarMock;
      await carController.create(req, res);

      const statusStub = res.status as sinon.SinonStub
      const jsonStub = res.json as sinon.SinonStub

      expect(statusStub.calledWith(201)).to.be.true;
      expect(jsonStub.calledWith(carWithIdMock)).to.be.true;
    });
  })

  describe('Lista Carros', () => {
    it('Verifica se lista todos os carros com sucesso', async () => {
      await carController.read(req, res);

      const statusStub = res.status as sinon.SinonStub
      const jsonStub = res.json as sinon.SinonStub

      expect(statusStub.calledWith(200)).to.be.true;
      expect(jsonStub.calledWith([carWithIdMock])).to.be.true;
    });

    it('Lista um carro, conforme seu id', async () => {
      req.params = { id: carWithIdMock._id };
      await carController.readOne(req, res);

      const statusStub = res.status as sinon.SinonStub
      const jsonStub = res.json as sinon.SinonStub

      expect(statusStub.calledWith(200)).to.be.true;
      expect(jsonStub.calledWith(carWithIdMock)).to.be.true;
    });
  })
})