import axios from '@/services/axios';
import { computed } from 'vue';
import { defineStore } from 'pinia';
import type { TokenResponse } from '@/types/accounts';
import { useStorage } from '@vueuse/core';

export const useAuth = defineStore('auth', () => {
  const token = useStorage('token', '');
  const expiry = useStorage('expiry', '');

  const expiryDate = new Date(expiry.value);
  if (expiryDate < new Date()) {
    $reset();
  }

  async function login(email: string, password: string) {
    try {
      const response = await axios.post<TokenResponse>('accounts/login/', {
        email,
        password,
      });
      token.value = response.data.token;
      expiry.value = response.data.expiry;
    }
    catch (error) {
      return Promise.reject(error);
    }
  }

  function logout() {
    axios.post('accounts/logout/');
    $reset();
  }

  const isAuthenticated = computed(() => {
    return Boolean(token.value);
  });

  function $reset() {
    token.value = '';
    expiry.value = '';
  }

  return {
    login,
    logout,
    isAuthenticated,
    $reset
  };
});
