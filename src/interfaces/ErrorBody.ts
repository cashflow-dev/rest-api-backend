/*eslint-disable */
export interface ErrorBody {
  statusCode: number;
  message: string;
  errorCode: number;
  errors: string[];
}

export default ErrorBody;
