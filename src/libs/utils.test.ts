import { getRequestedFields, handleMongoErrors, handleHttpErrors, stripIdAndNext } from './utils';
import MONGO_ERROR from '../enums/MONGO_ERROR';
import HTTP_STATUS_CODE from '../enums/HTTP_STATUS_CODE';
import { ValidationError } from './errors';

describe('/libs/utils.ts', () => {
  describe('getRequestedFields', () => {
    describe('Send comma seperated string to function', () => {
      it('should return object of fields from string', () => {
        const fieldsString = 'testing,test,testar';
        const result = getRequestedFields(fieldsString);
        const expected = fieldsString.split(',');
        expected.unshift('_id');
        expect(Object.keys(result)).toEqual(expected);
      });
    });
  });

  describe('handleMongoErrors', () => {
    describe('handle unkown error', () => {
      const errorMock = {
        message: `testing index: ${MONGO_ERROR.DUPLICATE} testing`,
        errmsg: `testing ${MONGO_ERROR.DUPLICATE} testing`,
      };
      it('should throw ValidationError', () => {
        expect(() => {
          handleMongoErrors(errorMock);
        }).toThrow(ValidationError);
      });
    });

    describe('handle mongo duplicate key error', () => {
      const errorMock = {
        message: `testing ${MONGO_ERROR.DUPLICATE} testing`,
        errmsg: 'unknown',
      };
      it('should throw Error', () => {
        expect(() => {
          handleMongoErrors(errorMock);
        }).toThrow(Error);
      });
    });
  });
  describe('handleHttpErrors', () => {
    const errorMock: any = {};
    const contextMock: any = {
      throw: jest.fn(),
    };
    describe('handle notFoundError', () => {
      it('should create a error body for not found', () => {
        errorMock.message = 'NotFoundError';
        handleHttpErrors(errorMock, contextMock);
        const expected = {
          message: errorMock.message,
          errors: errorMock.message,
          errorCode: HTTP_STATUS_CODE.NOT_FOUND,
          statusCode: HTTP_STATUS_CODE.NOT_FOUND,
        };
        expect(contextMock.body).toEqual(expected);
      });
    });
    describe('handle validationError', () => {
      it('should create a error body for validation error', () => {
        errorMock.message = 'ValidationError';
        errorMock.validationMessages = ['lots', 'of', 'errors'];
        handleHttpErrors(errorMock, contextMock);
        const expected = {
          message: errorMock.message,
          errors: errorMock.validationMessages,
          errorCode: HTTP_STATUS_CODE.BAD_REQUEST,
          statusCode: HTTP_STATUS_CODE.BAD_REQUEST,
        };
        expect(contextMock.body).toEqual(expected);
      });
    });
    describe('handle Service Unavailble Error', () => {
      it('should create a error body for Service Unavailble Error', () => {
        errorMock.message = 'Service Unavailable';
        handleHttpErrors(errorMock, contextMock);
        const expected = {
          message: errorMock.message,
          errors: 'Service Unavailable',
          errorCode: HTTP_STATUS_CODE.SERVICE_UNAVAILABLE,
          statusCode: HTTP_STATUS_CODE.SERVICE_UNAVAILABLE,
        };
        expect(contextMock.body).toEqual(expected);
      });
    });
    describe('handle Service unknown Error', () => {
      errorMock.message = 'unknown error';
      handleHttpErrors(errorMock, contextMock);
      expect(contextMock.throw).toHaveBeenCalled();
      expect(contextMock.throw).toHaveBeenCalledTimes(1);
    });
  });
  describe('stripIdAndNext', () => {
    describe('takes array of objects', () => {
      it('should strip next and _id', () => {
        const mockObj = {
          data: [{ test: 1, _id: 'test' }, { test: 2, _id: 'test' }, { test: 3, _id: 'test' }],
          next: 'test',
        };
        const mockJson = JSON.stringify(mockObj);
        const result = JSON.parse(stripIdAndNext(mockJson));
        expect(Object.keys(result).length).toBe(2);
        expect(result.next).toBe('exists');
        result.data.forEach((res: any) => {
          expect(Object.keys(res).length).toBe(1);
        });
      });
    });
    describe('takes an object', () => {
      it('should strip next and _id', () => {
        const mockObj = { data: { test: 1, _id: 'test' }, next: 'test' };
        const mockJson = JSON.stringify(mockObj);
        const result = JSON.parse(stripIdAndNext(mockJson));
        expect(Object.keys(result).length).toBe(2);
        expect(result.next).toBe('exists');
        expect(Object.keys(result.data).length).toBe(1);
      });
    });
  });
});
