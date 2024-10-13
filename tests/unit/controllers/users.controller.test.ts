import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import usersService from '../../../src/services/users.service';
import userController from '../../../src/controllers/users.controller';

chai.use(sinonChai);

describe('UsersController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  describe('getAllUsersAndTheirProducts', function () {
    it('should return all users and their products', async function () {
      const usersAndProducts = [{ username: 'User 1', products: ['asdf', 'hjkl'] }];
      sinon.stub(usersService, 'getUsersAndProducts').resolves(usersAndProducts);

      await userController.getAllUsersAndTheirProducts(req, res);

      expect(res.status).to.be.calledWith(200);
      expect(res.json).to.be.calledWith(usersAndProducts);
    });
  });
});