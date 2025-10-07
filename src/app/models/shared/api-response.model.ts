export enum ErrorType {
  None,
  Validation,
  NotFound,
  Conflict,
  Failure,
  Unauthorized,
  BadRequest,
  Forbidden,
}
export interface ApiResponse<T> {
  isSuccess: boolean;
  value: T|null;
  error: string |null;
  errorType: ErrorType;
}
export interface PagedResponse<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
