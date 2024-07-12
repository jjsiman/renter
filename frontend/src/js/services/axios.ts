import axios from 'axios';

import { useStorage } from '@vueuse/core';

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
