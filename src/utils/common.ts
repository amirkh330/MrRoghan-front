export const BaseURL =
  import.meta.env.MODE == "development"
    ? import.meta.env.VITE_APP_BASE_URL_DEV
    : import.meta.env.VITE_APP_BASE_URL_PROD;

export interface IApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export enum UsageEnum {
  SHORT = "short",
  MEDIUM = "medium",
  LONG = "long",
}
