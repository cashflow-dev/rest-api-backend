/* eslint-disable no-underscore-dangle */
import ObjectID from 'bson-objectid';
import request from 'supertest';
import { app } from '../../server';
import Account from '../../models/Account';
import { stripIdAndNext } from '../../libs/utils';

let server: any;
describe('/account', () => {
  let accountId: any;
  beforeAll(async () => {
    server = app.listen();

    const promises = [];
    for (let i = 0; i < 5; i += 1) {
      const account = new Account({ balance: i, name: `${i}`, ownerId: ObjectID.generate() });
      promises.push(account.save());
    }
    const response = await Promise.all(promises);
    accountId = response[0]._id;
  });
  afterAll(async () => {
    await server.close();
  });
  describe('GET /account', () => {
    it('should match snapshot', async () => {
      const response = await request(server).get('/account?fields=balance,name');
      expect(stripIdAndNext(response.text)).toMatchSnapshot();
      expect(response.status).toBe(200);
      expect(JSON.parse(response.text).data.length).toBeGreaterThan(0);
    });
  });
  describe('GET /account/:id', () => {
    it('should match snapshot', async () => {
      const response = await request(server).get(`/account/${accountId}`);
      expect(stripIdAndNext(response.text)).toMatchSnapshot();
      expect(response.status).toBe(200);
    });
  });
  describe('POST /account', () => {
    describe('with all fields', () => {
      const account = { balance: 200, name: 'test', ownerId: ObjectID.generate() };
      let response: any;
      let dbAccount: any;

      beforeAll(async () => {
        response = await request(server)
          .post('/account')
          .send(account);
        dbAccount = await Account.find({ ownerId: account.ownerId });
      });
      it('should match snapshot', () => {
        expect(response.text).toMatchSnapshot();
        expect(response.status).toBe(201);
      });
      it('should create a new account in the database', () => {
        expect(dbAccount.length).toBe(1);
      });
    });
    describe('with field missing', () => {
      describe('with ownerId missing', () => {
        it('should match snapshot', async () => {
          const account = {};
          const response = await request(server)
            .post('/account')
            .send(account);
          expect(response.text).toMatchSnapshot();
          expect(response.status).toBe(400);
        });
      });
    });
  });
  describe('PATCH /account', () => {
    let updateData: any;
    let currentAccount: any;
    let response: any;
    let updatedAccount: any;

    beforeAll(async () => {
      const query = { _id: accountId };
      updateData = { balance: 200 };
      currentAccount = await Account.find(query);
      response = await request(server)
        .patch(`/account/${accountId}`)
        .send(updateData);
      updatedAccount = await Account.find(query);
    });
    it('should currently have another balance', () => {
      expect(currentAccount[0].balance !== updateData.balance).toBe(true);
    });
    it('should respond with 204', () => {
      expect(response.status).toBe(204);
    });
    it('should have updated balance in database', () => {
      expect(updatedAccount[0].balance).toBe(updateData.balance);
    });
  });
  describe('DELETE /account/:id', () => {
    let response: any;
    let dbResponse: any;
    beforeAll(async () => {
      const query = { _id: accountId };
      response = await request(server).delete(`/account/${accountId}`);
      dbResponse = await Account.find(query);
    });
    it('should respond with 204', () => {
      expect(response.status).toBe(204);
    });
    it('should be removed from the database', () => {
      expect(dbResponse.length).toBe(0);
    });
  });
});
