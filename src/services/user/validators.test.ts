import { validateCreateBody, validateUpdateBody } from './validators';
import { ValidationError } from '../../libs/errors';

describe('/services/user/validators.ts', () => {
  let inputMock: any = { body: {} };

  afterEach(() => {
    inputMock = { body: {} };
  });

  describe('validateCreateBody', () => {
    describe('email is missing', () => {
      it('should throw validationError', () => {
        inputMock.body.password = 'testpassword';

        expect(() => {
          validateCreateBody(inputMock);
        }).toThrow(ValidationError);
      });
    });
    describe('password is missing', () => {
      it('should throw validationError', () => {
        inputMock.body.email = 'testemail';

        expect(() => {
          validateCreateBody(inputMock);
        }).toThrow(ValidationError);
      });
    });
    describe('with unknown field', () => {
      it('should strip unknown fields', () => {
        inputMock.body.email = 'testemail';
        inputMock.body.password = 'testpassword';
        inputMock.body.unknown = "shouldn't be here";
        validateCreateBody(inputMock);
        expect(Object.keys(inputMock.body).length).toBe(2);
      });
    });
  });
  describe('validateUpdateBody', () => {
    describe('atleast one field is required', () => {
      describe('one field', () => {
        it('should return undefined', () => {
          inputMock.body.password = 'testpassword';
          expect(validateUpdateBody(inputMock)).toBeUndefined();
        });
      });
      describe('all fields are missing', () => {
        it('should throw validationError', () => {
          expect(() => {
            validateCreateBody(inputMock);
          }).toThrow(ValidationError);
        });
      });
      describe('with unknown field', () => {
        it('should strip unknown fields', () => {
          inputMock.body.email = 'testemail';
          inputMock.body.password = 'testpassword';
          inputMock.body.unknown = "shouldn't be here";
          validateCreateBody(inputMock);
          expect(Object.keys(inputMock.body).length).toBe(2);
        });
      });
    });
  });
});
