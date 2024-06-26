import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { Router, createRouter, createWebHistory } from 'vue-router';

import LoginPage from '@/pages/LoginPage.vue';
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

afterEach(() => {
  vi.resetAllMocks();
});

const createWrapper = () => mount(LoginPage, {
  global: {
    plugins: [router, createTestingPinia({ createSpy: vi.fn })],
  }
});

test('should render', () => {
  const wrapper = createWrapper();

  expect(wrapper.exists()).toBe(true);
});

test('email and password are required', async () => {
  const wrapper = createWrapper();

  const email = wrapper.find<HTMLInputElement>('#email');
  expect(email.element.checkValidity()).toBe(false);

  const password = wrapper.find<HTMLInputElement>('#password');
  expect(password.element.checkValidity()).toBe(false);
});

test('email must be formatted correctly', async () => {
  const wrapper = createWrapper();

  const email = wrapper.find<HTMLInputElement>('#email');
  await email.setValue('abc123');
  expect(email.element.checkValidity()).toBe(false);

  await email.setValue('test@example.com');
  expect(email.element.checkValidity()).toBe(true);
});

test('login error is shown to user', async () => {
  const wrapper = createWrapper();

  const auth = useAuth();
  vi.mocked(auth.login).mockRejectedValue('Error');

  await wrapper.find('#email').setValue('test@example.com');
  await wrapper.find('#password').setValue('test');
  await wrapper.find('form').trigger('submit.prevent');
  await nextTick();

  expect(wrapper.find('#validationFeedback').exists()).toBe(true);
});

test('successful login redirects the user home', async () => {
  const wrapper = createWrapper();
  const push = vi.spyOn(router, 'push');

  await wrapper.find('#email').setValue('test@example.com');
  await wrapper.find('#password').setValue('test');
  await wrapper.find('form').trigger('submit.prevent');

  expect(push).toHaveBeenCalledOnce();
  expect(push).toHaveBeenCalledWith({ name: 'home' });
});
