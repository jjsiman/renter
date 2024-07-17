import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import axios from '@/services/axios';
import { useAuth } from '@/stores/auth';

vi.useFakeTimers();
vi.setSystemTime(new Date(2024, 1, 1));

const getItem = vi.spyOn(Storage.prototype, 'getItem');

vi.mock('@/services/axios');

beforeEach(() => {
  setActivePinia(createPinia());
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
  const store = useAuth();
  expect(store.isAuthenticated).toBe(false);
});

test('isAuthenticated is true when token is present', () => {
  getItem.mockImplementation(() => 'abc');

  const store = useAuth();
  expect(store.isAuthenticated).toBe(true);
});

test('token is cleared if expiry is in the past', () => {
  getItem.mockImplementationOnce(() => 'abc').mockImplementationOnce(() => '2010-01-01');

  const store = useAuth();
  expect(store.isAuthenticated).toBe(false);
});

test('reset effectively logs out a user', () => {
  getItem.mockImplementation(() => 'abc');

  const store = useAuth();
  expect(store.isAuthenticated).toBe(true);
  store.$reset();
  expect(store.isAuthenticated).toBe(false);
});
