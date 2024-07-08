import * as vueUse from '@vueuse/core';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import axios from '@/services/axios';
import { ref } from 'vue';
import { useAuth } from '@/stores/auth';

vi.useFakeTimers();
vi.setSystemTime(new Date(2024, 1, 1));

vi.mock('@vueuse/core', () => ({
  useStorage: vi.fn()
}));
vi.mock('@/services/axios');

const useStorage = vi.spyOn(vueUse, 'useStorage');

beforeEach(() => {
  setActivePinia(createPinia());

  // Provide empty default for any key
  useStorage.mockImplementation(() => ref(''));
});

afterEach(() => {
  vi.resetAllMocks();
});

test('login issues post request with email and password', () => {
  const spy = vi.spyOn(axios, 'post');
  spy.mockResolvedValue({ data: { token: '', expiry: '' } });

  const email = 'test@test.com';
  const password = 'abc123';

  const store = useAuth();
  store.login(email, password);

  expect(spy).toHaveBeenCalled();
  expect(spy).toHaveBeenCalledOnce();
  expect(spy).toHaveBeenCalledWith('accounts/login/', { email, password });
});

test('logout issues post request to logout', () => {
  const spy = vi.spyOn(axios, 'post');
  const store = useAuth();
  store.logout();

  expect(spy).toHaveBeenCalled();
  expect(spy).toHaveBeenCalledOnce();
  expect(spy).toHaveBeenCalledWith('accounts/logout/');
});

test('isAuthenticated is false when token is absent', () => {
  useStorage.mockImplementation(() => ref(''));

  const store = useAuth();
  expect(store.isAuthenticated).toBe(false);
});

test('isAuthenticated is true when token is present', () => {
  useStorage.mockImplementation(() => ref('abc'));

  const store = useAuth();
  expect(store.isAuthenticated).toBe(true);
});

test('token is cleared if expiry is in the past', () => {
  useStorage.mockImplementationOnce(() => ref('abc')).mockImplementationOnce(() => ref('2010-01-01'));

  const store = useAuth();
  expect(store.isAuthenticated).toBe(false);
});

test('reset effectively logs out a user', () => {
  useStorage.mockImplementation(() => ref('abc'));

  const store = useAuth();
  expect(store.isAuthenticated).toBe(true);
  store.$reset();
  expect(store.isAuthenticated).toBe(false);
});
