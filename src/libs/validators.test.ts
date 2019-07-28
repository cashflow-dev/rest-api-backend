import ObjectID from 'bson-objectid';
import { validateId, validateSearch, validateQuery, composeValidators } from './validators';
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
  describe('validateSearch', () => {
    describe('validation success', () => {
      const inputMock = {
        query: {
          search: 'string',
        },
      };
      it('should return undefined', () => {
        const result = validateSearch(inputMock);
        expect(result).toBeUndefined();
      });
    });

    describe('validation failed', () => {
      const inputMock = {
        query: {
          search: 2,
        },
      };
      it('Should throw ValidationError', () => {
        expect(() => {
          validateSearch(inputMock);
        }).toThrow(ValidationError);
      });
    });

    describe('input with fields not in schema', () => {
      const inputMock = {
        query: {
          search: 'string',
          test: "shouldn't be here",
        },
      };
      it('should strip not validated input', () => {
        validateSearch(inputMock);
        expect(Object.keys(inputMock.query).length).toBe(1);
      });
    });
  });
  describe('validateQuery', () => {
    describe('validation success', () => {
      const inputMock = {
        query: {
          next: ObjectID.generate(),
          fields: 'string',
          limit: 50,
        },
      };
      it('should return undefined', () => {
        const result = validateSearch(inputMock);
        expect(result).toBeUndefined();
      });
    });

    describe('validation failed - next pointer', () => {
      const inputMock = {
        query: {
          next: 'fake',
          fields: 'string',
          limit: 50,
        },
      };
      it('Should throw ValidationError', () => {
        expect(() => {
          validateQuery(inputMock);
        }).toThrow(ValidationError);
      });
    });
    describe('validation failed - limit max', () => {
      const inputMock = {
        query: {
          next: ObjectID.generate(),
          fields: 'string',
          limit: 60,
        },
      };
      it('Should throw ValidationError', () => {
        expect(() => {
          validateQuery(inputMock);
        }).toThrow(ValidationError);
      });
    });
    describe('validation failed - limit min', () => {
      const inputMock = {
        query: {
          next: ObjectID.generate(),
          fields: 'string',
          limit: 0,
        },
      };
      it('Should throw ValidationError', () => {
        expect(() => {
          validateQuery(inputMock);
        }).toThrow(ValidationError);
      });
    });
    describe('validation failed - fields', () => {
      const inputMock = {
        query: {
          next: ObjectID.generate(),
          fields: ['string', ['string']],
          limit: 50,
        },
      };
      it('Should throw ValidationError', () => {
        expect(() => {
          validateQuery(inputMock);
        }).toThrow(ValidationError);
      });
    });

    describe('input with fields not in schema', () => {
      const inputMock = {
        query: {
          next: ObjectID.generate(),
          fields: 'string',
          test: "shouldn't be here",
          limit: 50,
        },
      };
      it('should strip not validated input', () => {
        validateQuery(inputMock);
        expect(Object.keys(inputMock.query).length).toBe(3);
      });
    });
  });
  describe('composeValidators', () => {
    describe('composing  two functions', () => {
      it('both functions should be called', () => {
        const func1 = jest.fn();
        const func2 = jest.fn();
        const mockInput: any = {};
        composeValidators(func1, func2)(mockInput);
        expect(func1).toHaveBeenCalled();
        expect(func1).toHaveBeenCalledTimes(1);
        expect(func2).toHaveBeenCalled();
        expect(func2).toHaveBeenCalledTimes(1);
      });
    });
  });
});
