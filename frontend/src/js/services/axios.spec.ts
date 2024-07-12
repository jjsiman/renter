import * as vueUse from '@vueuse/core';
import { afterEach, expect, test, vi } from 'vitest';
import axios from '@/services/axios';
import { ref } from 'vue';

vi.mock('@vueuse/core', () => ({
  useStorage: vi.fn(),
}));

const useStorage = vi.spyOn(vueUse, 'useStorage');

afterEach(() => {
  vi.resetAllMocks();
});

test('token is added to headers when present', async () => {
  useStorage.mockImplementation(() => ref('abc'));

  // @ts-expect-error handlers does not exist in interface: https://github.com/axios/axios/pull/5551
  const response = axios.interceptors.request.handlers[0].fulfilled({ headers: {} });
  expect(response.headers.Authorization).toBe('Token abc');
});

test('token is not added if not present', async () => {
  useStorage.mockImplementation(() => ref(''));

  // @ts-expect-error handlers does not exist in interface: https://github.com/axios/axios/pull/5551
  const response = axios.interceptors.request.handlers[0].fulfilled({ headers: {} });
  expect(response.headers.Authorization).toBeUndefined();
});
