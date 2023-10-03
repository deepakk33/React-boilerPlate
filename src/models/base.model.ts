export interface KeyValueType {
  [key: string]: string;
}

export interface Pagination {
  pageSize: number;
  totalPages: number;
  pageNumber: number;
  numberOfElements: number;
  totalElements: number;
}
