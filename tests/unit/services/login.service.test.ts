import { expect } from 'chai';
import sinon from 'sinon';
import login from '../../../src/services/login.service';

describe('LoginService', function () {
  beforeEach(function () { sinon.restore(); });

  describe('login', function () {
    it('should throw an error if username is missing', async function () {
      const username = '';
      const password = '123213';

      try {
        await login.login(username, password);
        expect.fail('Expected an error to be thrown');
      } catch (error: any) {
        expect(error.message).to.equal('"username" and "password" are required');
      }
    });

    it('should throw an error if password is missing', async function () {
      const username = 'asdf';
      const password = '';

      try {
        await login.login(username, password);
        expect.fail('Expected an error to be thrown');
      } catch (error: any) {
        expect(error.message).to.equal('"username" and "password" are required');
      }
    });

    it('should throw an error if username or password is invalid', async function () {
      const username = 'hjkl_asdf';
      const password = 'foo_bar';

      try {
        await login.login(username, password);
        expect.fail('Expected an error to be thrown');
      } catch (error: any) {
        expect(error.message).to.equal('Username or password invalid');
      }
    });

    it('should return a token if username and password are valid', async function () {
      const username = 'Hagar';
      const password = 'terrível';

      const token = await login.login(username, password);

      expect(token).to.be.a('string');
    });
  });
});