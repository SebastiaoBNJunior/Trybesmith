import { expect } from 'chai';
import sinon from 'sinon';
import createProduct from '../../../src/services/products.service';
import ProductModel from '../../../src/database/models/product.model';

describe('ProductsService', function () {
  beforeEach(function () { sinon.restore(); });

  describe('createProduct', function () {
    it('should create a new product', async function () {
      const product = {
        id: 1,
        name: 'hjkl',
        price: '21.90',
        userId: 1,
      };

      const createStub = sinon.stub(ProductModel, 'create').resolves();
      const countStub = sinon.stub(ProductModel, 'count').resolves(1);

      const result = await createProduct.createProduct(product);

      expect(createStub.calledOnceWith(product)).to.be.true;
      expect(countStub.calledOnce).to.be.true;
      expect(result).to.deep.equal({
        id: 1,
        name: product.name,
        price: product.price,
        userId: product.userId,
      });
    });
  });

  describe('getAllProducts', function () {
    it('should return all products', async function () {
      const products: any = [
        {
          "dataValues": {
            id: 1,
            name: 'hjkl',
            price: '21.90',
            userId: 1,
          },
        },
      ]

      const findAllStub = sinon.stub(ProductModel, 'findAll').resolves(products);

      const result = await createProduct.getAllProducts();

      expect(findAllStub.calledOnce).to.be.true;
      expect(result).to.deep.equal([
        {
          id: 1,
          name: 'hjkl',
          price: '21.90',
          userId: 1,
        },
      ]);
    });
  });
});