export const BaseURL =
  import.meta.env.MODE == "development"
    ? import.meta.env.VITE_APP_BASE_URL_DEV
    : import.meta.env.VITE_APP_BASE_URL_PROD;
