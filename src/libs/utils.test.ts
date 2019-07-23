import { getRequestedFields, handleMongoErrors } from './utils';
import MONGO_ERROR from '../enums/MONGO_ERROR';
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
});
