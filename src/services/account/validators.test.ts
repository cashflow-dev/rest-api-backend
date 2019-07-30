import ObjectID from 'bson-objectid';
import { validateCreateBody, validateUpdateBody } from './validators';
import { ValidationError } from '../../libs/errors';

describe('/services/user/valdators.ts', () => {
  let inputMock: any = {
    body: {},
  };
  afterEach(() => {
    inputMock = {
      body: {},
    };
  });
  describe('validateCreateBody', () => {
    describe('with all fields with correct type', () => {
      it('should return undefined', () => {
        inputMock.body.balance = 100;
        inputMock.body.name = 'test';
        inputMock.body.ownerId = ObjectID.generate();
        const result = validateCreateBody(inputMock);
        expect(result).toBeUndefined();
      });
    });
    describe('ownerId is missing', () => {
      it('should throw validationError', () => {
        inputMock.body.balance = 100;
        inputMock.body.name = 'test';
        expect(() => {
          validateCreateBody(inputMock);
        }).toThrow(ValidationError);
      });
    });
    describe('balance is not a number', () => {
      it('should throw validationError', () => {
        inputMock.body.balance = 'test';
        inputMock.body.name = 'test';
        inputMock.body.ownerId = ObjectID.generate();
        expect(() => {
          validateCreateBody(inputMock);
        }).toThrow(ValidationError);
      });
    });
    describe('name is not a string', () => {
      it('should throw validationError', () => {
        inputMock.body.balance = 100;
        inputMock.body.name = 1337;
        inputMock.body.ownerId = ObjectID.generate();
        expect(() => {
          validateCreateBody(inputMock);
        }).toThrow(ValidationError);
      });
    });
    describe('with unknown field', () => {
      it('should strip unknown fields', () => {
        inputMock.body.balance = 100;
        inputMock.body.name = 'test';
        inputMock.body.ownerId = ObjectID.generate();
        inputMock.body.unknown = 'should not be here';
        validateCreateBody(inputMock);
        expect(Object.keys(inputMock.body).length).toBe(3);
      });
    });
  });
  describe('validateUpdateBody', () => {
    describe('missing all fields', () => {
      it('should throw validationError', () => {
        expect(() => {
          validateUpdateBody(inputMock);
        }).toThrow(ValidationError);
      });
    });
    describe('with unknown field', () => {
      it('should strip unknown fields', () => {
        inputMock.body.balance = 100;
        inputMock.body.name = 'test';
        inputMock.body.ownerId = ObjectID.generate();
        inputMock.body.unknown = 'should not be here';
        validateUpdateBody(inputMock);
        expect(Object.keys(inputMock.body).length).toBe(3);
      });
    });
    describe('with all fields with correct type', () => {
      it('should return undefined', () => {
        inputMock.body.balance = 100;
        inputMock.body.name = 'test';
        inputMock.body.ownerId = ObjectID.generate();
        const result = validateUpdateBody(inputMock);
        expect(result).toBeUndefined();
      });
    });
  });
});
