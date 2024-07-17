import { afterEach, expect, test, vi } from 'vitest';
import axios from '@/services/axios';

const getItem = vi.spyOn(Storage.prototype, 'getItem');

afterEach(() => {
  vi.resetAllMocks();
});

test('token is added to headers when present', async () => {
  getItem.mockImplementation(() => 'abc');

  // @ts-expect-error handlers does not exist in interface: https://github.com/axios/axios/pull/5551
  const response = axios.interceptors.request.handlers[0].fulfilled({ headers: {} });
  expect(response.headers.Authorization).toBe('Token abc');
});

test('token is not added if not present', async () => {
  getItem.mockImplementation(() => '');

  // @ts-expect-error handlers does not exist in interface: https://github.com/axios/axios/pull/5551
  const response = axios.interceptors.request.handlers[0].fulfilled({ headers: {} });
  expect(response.headers.Authorization).toBeUndefined();
});
