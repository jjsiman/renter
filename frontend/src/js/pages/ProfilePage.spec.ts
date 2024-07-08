import { test, afterEach, beforeEach, expect, vi } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';

import axios from '@/services/axios';

import ProfileForm from '@/components/ProfileForm.vue';
import ProfilePage from './ProfilePage.vue';
import { Router, createRouter, createWebHistory } from 'vue-router';
import { routes } from '@/routes';
import { createTestingPinia } from '@pinia/testing';

const axiosMock = vi.spyOn(axios, 'get');

let router: Router;

beforeEach(async () => {
  router = createRouter({
    history: createWebHistory(),
    routes: routes,
  });

  router.push('/');
  await router.isReady();
});

afterEach(() => {
  vi.resetAllMocks();
});

const createWrapper = () => mount(ProfilePage, {
  global: {
    plugins: [router, createTestingPinia({ createSpy: vi.fn })],
  }
});

test('loading is shown while user is loading', async () => {
  axiosMock.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

  const wrapper = createWrapper();
  await flushPromises();

  expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
});

test('profile form is shown when user is loaded', async () => {
  axiosMock.mockResolvedValue({ data: { email: 'test@example.com' } });

  const wrapper = createWrapper();
  await flushPromises();

  expect(wrapper.findComponent(ProfileForm).exists()).toBe(true);
});

test('error is shown when user cannot be fetched', async () => {
  axiosMock.mockRejectedValue(new Error());

  const wrapper = createWrapper();
  await flushPromises();

  expect(wrapper.find('[data-test="error"]').exists()).toBe(true);
});
