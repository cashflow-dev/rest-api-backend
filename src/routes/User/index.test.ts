import request from 'supertest';
import _ from 'lodash';
import { app } from '../../server';
import { stripIdAndNext } from '../../libs/utils';
import User from '../../models/User';

let server: any;

describe('/user', () => {
  let userId: any;

  beforeAll(async () => {
    server = app.listen();
    const promises = [];
    for (let i = 0; i < 5; i += 1) {
      const user = new User({ email: `test${i}@test.com`, password: `test${i}` });
      promises.push(user.save());
    }
    const res = await Promise.all(promises);
    /* eslint-disable no-underscore-dangle */
    userId = res[0]._id;
    /* eslint-enable no-underscore-dangle */
  });

  afterAll(async () => {
    await server.close();
  });
  describe('GET /user', () => {
    it('should get users', async () => {
      const response = await request(server).get('/user?fields=email,password');
      expect(stripIdAndNext(response.text)).toMatchSnapshot();
      expect(response.status).toBe(200);
      expect(JSON.parse(response.text).data.length).toBeGreaterThan(0);
    });
  });
  describe('POST /user', () => {
    describe('with all fields', () => {
      const user = { email: 'test@test.com', password: 'test' };
      let response: any;
      let dbUser: any;

      beforeAll(async () => {
        response = await request(server)
          .post('/user')
          .send(user);
        dbUser = await User.find(user);
      });
      it('should match snapshot', async () => {
        expect(response.text).toMatchSnapshot();
        expect(response.status).toBe(201);
      });
      it('should create a new user in the database', () => {
        expect(dbUser.length).toBe(1);
      });
    });
    describe('with fields missing', () => {
      describe('with email missing', () => {
        it('should match snapshot', async () => {
          const user = { password: 'test' };
          const response = await request(server)
            .post('/user')
            .send(user);
          expect(response.text).toMatchSnapshot();
          expect(response.status).toBe(400);
        });
      });
      describe('with password missing', () => {
        it('should match snapshot', async () => {
          const user = { email: 'test@test.com' };
          const response = await request(server)
            .post('/user')
            .send(user);
          expect(response.text).toMatchSnapshot();
          expect(response.status).toBe(400);
        });
      });
    });
  });
  describe('PATCH /user/:id -> Update password', () => {
    let updateData: any;
    let initUser: any;
    let response: any;
    let updatedUser: any;
    beforeAll(async () => {
      const query = { _id: userId };
      updateData = { password: 'newTestPassword' };
      initUser = await User.find(query);
      response = await request(server)
        .patch(`/user/${userId}`)
        .send(updateData);
      updatedUser = await User.find(query);
    });
    it('should currently have another password', () => {
      expect(initUser[0].password === updateData.password).toBe(false);
    });
    it('should respond with 204', async () => {
      expect(response.status).toBe(204);
    });
    it('should update the user in the database', () => {
      expect(updatedUser[0].password).toBe(updateData.password);
    });
  });
  describe('GET /user:id', () => {
    let response: any;
    let dbUser: any;
    beforeAll(async () => {
      const query = { _id: userId };
      response = await request(server).get(`/user/${userId}?fields=email,password`);
      const [{ email, password }] = await User.find(query);
      dbUser = { email, password };
    });
    it('should return user & match snapshot', async () => {
      expect(stripIdAndNext(response.text)).toMatchSnapshot();
      expect(response.status).toBe(200);
    });
    it('shuld match with the user in the database', () => {
      expect(_.omit(JSON.parse(response.text).data, '_id')).toEqual(dbUser);
    });
  });
  describe('DELETE /user/:id', () => {
    let response: any;
    let dbResponse: any;
    beforeAll(async () => {
      const query = { _id: userId };
      response = await request(server).delete(`/user/${userId}`);
      dbResponse = await User.find(query);
    });
    it('should respond with 204', async () => {
      expect(response.status).toBe(204);
    });
    it('should remove the user from the database', () => {
      expect(dbResponse.length).toBe(0);
    });
  });
});
