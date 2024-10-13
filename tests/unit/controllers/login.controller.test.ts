import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import loginController from '../../../src/controllers/login.controller';
import loginService from '../../../src/services/login.service';

chai.use(sinonChai);

describe('LoginController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('should return a token when valid username and password are provided', async function () {
    const username = 'hjklasdf';
    const password = 'aoeuasdf';
    req.body = { username, password };

    const loginServiceStub = sinon.stub(loginService, 'login').resolves('testtoken');

    await loginController.loginController(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith({ token: 'testtoken' });
    expect(loginServiceStub).to.be.calledWith(username, password);
  });

  it('should return a 401 status code and error message when username or password is invalid', async function () {
    const username = 'foofoo';
    const password = 'barbar';
    req.body = { username, password };

    const loginServiceStub = sinon.stub(loginService, 'login').throws(new Error('Username or password invalid'));

    await loginController.loginController(req, res);

    expect(res.status).to.be.calledWith(401);
    expect(res.json).to.be.calledWith({ message: 'Username or password invalid' });
    expect(loginServiceStub).to.be.calledWith(username, password);
  });

  it('should return a 400 status code and error message when an error occurs', async function () {
    const username = 'foobar';
    const password = 'barfoo';
    req.body = { username, password };

    const loginServiceStub = sinon.stub(loginService, 'login').throws(new Error('Some error occurred'));

    await loginController.loginController(req, res);

    expect(res.status).to.be.calledWith(400);
    expect(res.json).to.be.calledWith({ message: 'Some error occurred' });
    expect(loginServiceStub).to.be.calledWith(username, password);
  });
});