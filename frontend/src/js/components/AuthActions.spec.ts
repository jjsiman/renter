import { beforeEach, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { Router, createRouter, createWebHistory } from 'vue-router';

import AuthActions from '@/components/AuthActions.vue';
import { createTestingPinia } from '@pinia/testing';

import { useAuth } from '@/stores/auth';

import { routes } from '@/routes';
import { nextTick } from 'vue';

let router: Router;

beforeEach(async () => {
  router = createRouter({
    history: createWebHistory(),
    routes: routes,
  });

  router.push('/');
  await router.isReady();
});

const createWrapper = () => mount(AuthActions, {
  global: {
    plugins: [router, createTestingPinia({
      createSpy: vi.fn,
    })],
  }
});

test('should render', () => {
  const wrapper = createWrapper();

  expect(wrapper.exists()).toBe(true);
});

test('login and signup are shown if a user is unauthenticated', async () => {
  const wrapper = createWrapper();
  const auth = useAuth();
  // @ts-expect-error: getters are writable in tests
  auth.isAuthenticated = false;
  await nextTick();

  expect(wrapper.find('[data-test="login"]').exists()).toBe(true);
  expect(wrapper.find('[data-test="signup"]').exists()).toBe(true);
});

test('logout and profile are shown if a user is authenticated', async () => {
  const wrapper = createWrapper();
  const auth = useAuth();
  // @ts-expect-error: getters are writable in tests
  auth.isAuthenticated = true;
  await nextTick();

  expect(wrapper.find('[data-test="logout"]').exists()).toBe(true);
  expect(wrapper.find('[data-test="profile"]').exists()).toBe(true);
});

test('logging out redirects the user to the home page', async () => {
  const push = vi.spyOn(router, 'push');
  const wrapper = createWrapper();
  const auth = useAuth();
  // @ts-expect-error: getters are writable in tests
  auth.isAuthenticated = true;
  await nextTick();

  await wrapper.find('[data-test="logout"]').trigger('click');
  expect(auth.logout).toHaveBeenCalled();
  expect(auth.logout).toHaveBeenCalledOnce();

  expect(push).toHaveBeenCalled();
  expect(push).toHaveBeenCalledWith({ name: 'home' });
});
