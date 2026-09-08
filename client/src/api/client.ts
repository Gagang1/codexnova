import axios from 'axios';

export const FORM_SUCCESS_MESSAGE = 'Our mentor will reach out to you soon.';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
  timeout: 20_000,
});

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ERR_NETWORK' || !error.response) {
        return Promise.reject(
          new Error('Unable to reach the server. Please make sure the app is running and try again.'),
        );
      }

      const message =
        (error.response.data as { message?: string } | undefined)?.message ||
        error.message ||
        'Something went wrong. Please try again.';
      return Promise.reject(new Error(message));
    }
    return Promise.reject(error);
  },
);

export function getFormSuccessMessage(data: unknown): string {
  const message = (data as { message?: string } | undefined)?.message;
  return message?.trim() || FORM_SUCCESS_MESSAGE;
}
