import ObjectID from 'bson-objectid';
import { validateId } from './validators';
import { ValidationError } from './errors';

describe('/libs/validators.ts', () => {
  describe('validateId', () => {
    describe('validation success', () => {
      const inputMock = {
        params: {
          id: ObjectID.generate(),
          test: "shouldn't be here",
        },
      };
      it('should return undefined', () => {
        const result = validateId(inputMock);
        expect(result).toBeUndefined();
      });
    });

    describe('validation failed', () => {
      const inputMock = {
        params: {
          id: 'fake id',
        },
      };
      it('Should throw ValidationError', () => {
        expect(() => {
          validateId(inputMock);
        }).toThrow(ValidationError);
      });
    });

    describe('input with fields not in schema', () => {
      const inputMock = {
        params: {
          id: ObjectID.generate(),
          test: "shouldn't be here",
        },
      };
      it('should strip not validated input', () => {
        validateId(inputMock);
        expect(Object.keys(inputMock.params).length).toBe(1);
      });
    });
  });
});
