export interface BaseResponse<Data> {
  error?: string;
  message?: string;
  data: Data;
}
