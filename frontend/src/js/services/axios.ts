import axios from 'axios';

import { useStorage } from '@vueuse/core';

export interface PaginatedListResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<T>;
};

const instance = axios.create({
  baseURL: '/api/',
});

instance.interceptors.request.use((config) => {
  const token = useStorage('token', '');
  if (token.value) {
    config.headers.Authorization = `Token ${token.value}`;
  }
  return config;
});

export default instance;
