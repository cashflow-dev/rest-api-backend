export interface Service {
  private input: any;
  public validator: any;
  [key: string]: any;
}

export interface ServiceClass {
  new (dataInput: any): Service;
}
