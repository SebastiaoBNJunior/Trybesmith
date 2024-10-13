import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import productsController from '../../../src/controllers/products.controller';

import productsService from '../../../src/services/products.service';

chai.use(sinonChai);

describe('ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  describe('createProductController', function () {
    it('should create a new product and return the result', async function () {
      const req = {
        body: {
          name: 'hjkl',
          price: "21.90",
          userId: 1
        }
      } as Request;

      const product = {
        name: 'hjkl',
        price: "21.90",
        userId: 1
      };

      const expectedResult = {
        id: 1,
        name: 'hjkl',
        price: "21.90",
        userId: 1
      };

      sinon.stub(productsService, 'createProduct').resolves(expectedResult);

      await productsController.createProductController(req, res);

      expect(res.status).to.be.calledWith(201);
      expect(res.json).to.be.calledWith(expectedResult);
    });
  });

  describe('getAllProductsController', function () {
    it('should get all products and return the result', async function () {
      const expectedResult = [
        {
          id: 1,
          name: 'hjkl',
          price: "10.00",
          userId: 1
        },
        {
          id: 2,
          name: 'Cheese Burger',
          price: "21.90",
          userId: 1
        }
      ];
  
      sinon.stub(productsService, 'getAllProducts').resolves(expectedResult);
  
      await productsController.getAllProductsController(req, res);
  
      expect(res.status).to.be.calledWith(200);
      expect(res.json).to.be.calledWith(expectedResult);
    });
  });
});