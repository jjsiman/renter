import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { createRouter, createWebHistory, Router } from 'vue-router';
import { flushPromises, mount } from '@vue/test-utils';
import axios from '@/services/axios';
import { createTestingPinia } from '@pinia/testing';
import ProfileForm from '@/components/ProfileForm.vue';
import ProfilePage from '@/pages/ProfilePage.vue';
import { routes } from '@/routes';

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
