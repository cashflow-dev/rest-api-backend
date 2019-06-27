import { InputData } from "./InputData";

export interface Service {
  input: any;
  validators: any;
  [key: string]: any;
}

export interface ServiceClass {
  new (inputData: InputData): Service;
}
