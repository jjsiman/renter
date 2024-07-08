import { afterEach, expect, test, vi } from 'vitest';
import { AxiosError, AxiosResponse } from 'axios';
import { flushPromises, mount } from '@vue/test-utils';
import axios from '@/services/axios';
import { createTestingPinia } from '@pinia/testing';
import SignUpPage from '@/pages/SignUpPage.vue';
import { useAuth } from '@/stores/auth';
import { useRouter } from 'vue-router';

const post = vi.spyOn(axios, 'post');

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: () => { }
  }))
}));

const createWrapper = () => mount(SignUpPage, {
  global: {
    plugins: [createTestingPinia({ createSpy: vi.fn })],
    stubs: ['RouterLink']
  },
});

afterEach(() => {
  vi.resetAllMocks();
});

test('passwords must match', async () => {
  const wrapper = createWrapper();

  await wrapper.find('[name="password"]').setValue('test');
  await wrapper.find('[name="repeatPassword"]').setValue('not test');

  await wrapper.find('form').trigger('submit.prevent');

  expect(wrapper.find('#repeatPasswordValidationFeedback').text()).toBe('Passwords must match.');
});

test('sign up errors are shown when the account cannot be created', async () => {
  const message = 'Email is invalid.';

  post.mockRejectedValue(new AxiosError(
    undefined,
    undefined,
    undefined,
    undefined,
    { data: { email: [message] } } as AxiosResponse
  ));
  const wrapper = createWrapper();

  await wrapper.find('[name="email"]').setValue('test@example.com');
  await wrapper.find('[name="password"]').setValue('test');
  await wrapper.find('[name="repeatPassword"]').setValue('test');

  await wrapper.find('form').trigger('submit.prevent');
  await flushPromises();

  expect(wrapper.find('#emailValidationFeedback').text()).toBe(message);
});

test('password errors are shown if a password is invalid', async () => {
  const message = 'Password is invalid.';

  post.mockRejectedValue(new AxiosError(
    undefined,
    undefined,
    undefined,
    undefined,
    { data: { password: [message] } } as AxiosResponse
  ));
  const wrapper = createWrapper();

  await wrapper.find('[name="email"]').setValue('test@example.com');
  await wrapper.find('[name="password"]').setValue('test');
  await wrapper.find('[name="repeatPassword"]').setValue('test');

  await wrapper.find('form').trigger('submit.prevent');
  await flushPromises();

  expect(wrapper.find('#passwordValidationFeedback').text()).toBe(message);
});

test('login errors are shown when the new user is not logged in', async () => {
  const wrapper = createWrapper();

  const auth = useAuth();
  vi.mocked(auth.login).mockRejectedValue('Error');

  await wrapper.find('[name="email"]').setValue('test@example.com');
  await wrapper.find('[name="password"]').setValue('test');
  await wrapper.find('[name="repeatPassword"]').setValue('test');

  await wrapper.find('form').trigger('submit.prevent');
  await flushPromises();

  expect(wrapper.find('[data-test="loginError"]').exists()).toBe(true);
});

test('user is navigated home on successful signup and login', async () => {
  const push = vi.fn();
  // @ts-expect-error mocked Router
  vi.mocked(useRouter).mockReturnValue({ push });

  const wrapper = createWrapper();

  await wrapper.find('[name="email"]').setValue('test@example.com');
  await wrapper.find('[name="password"]').setValue('test');
  await wrapper.find('[name="repeatPassword"]').setValue('test');

  await wrapper.find('form').trigger('submit.prevent');

  expect(push).toHaveBeenCalled();
  expect(push).toHaveBeenCalledWith({ name: 'home' });
});
