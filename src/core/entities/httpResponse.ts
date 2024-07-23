export interface HttpResponse<T> {
  statusCode: number;
  isSuccessfull: boolean;
  timestamp: Date;
  data: T;
}
