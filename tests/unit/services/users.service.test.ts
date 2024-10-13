import { expect } from 'chai';
import sinon from 'sinon';
import usersService from '../../../src/services/users.service';
import ProductModel from '../../../src/database/models/product.model';
import UserModel from '../../../src/database/models/user.model';

describe('UsersService', function () {
  beforeEach(function () { sinon.restore(); });

  describe('getUsersAndProducts', function () {
    it('should return an array of users with their associated product ids', async function () {
      const users: any = [
        {
          "dataValues": {
            id: 1,
            username: 'user1',
          },
        },
        {
          "dataValues": {
            id: 2,
            username: 'user2',
          },
        },
      ];

      const products: any = [
        {
          "dataValues": {
            id: 1,
            name: 'hjkl',
            price: '21.90',
            userId: 1,
          },
        },
        {
          "dataValues": {
            id: 2,
            name: 'asdf',
            price: '12.90',
            userId: 1,
          },
        },
        {
          "dataValues": {
            id: 3,
            name: 'qwerty',
            price: '32.90',
            userId: 2,
          },
        },
      ];

      const findAllUsersStub = sinon.stub(UserModel, 'findAll').resolves(users);
      const findAllProductsStub = sinon.stub(ProductModel, 'findAll').resolves(products);

      const result = await usersService.getUsersAndProducts();

      expect(findAllUsersStub.calledOnce).to.be.true;
      expect(findAllProductsStub.calledOnce).to.be.true;
      expect(result).to.deep.equal([
        {
          username: 'user1',
          productIds: [1, 2],
        },
        {
          username: 'user2',
          productIds: [3],
        },
      ]);
    });
  });
});