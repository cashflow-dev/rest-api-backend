export interface Service {
  input: any;
  validators: any;
  [key: string]: any;
}

export interface ServiceClass {
  new (dataInput: any): Service;
}
