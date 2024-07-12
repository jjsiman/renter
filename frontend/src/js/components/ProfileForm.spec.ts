import { afterEach, expect, test, vi } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import axios from '@/services/axios';
import ProfileForm from '@/components/ProfileForm.vue';

const axiosMock = vi.spyOn(axios, 'patch');

afterEach(() => {
  vi.resetAllMocks();
});

const createWrapper = () => mount(ProfileForm, {
  props: {
    user: {
      email: 'test@example.com',
    },
  },
});

test('the user can change their email', async () => {
  axiosMock.mockResolvedValue({});

  const wrapper = createWrapper();

  await wrapper.find('#email').setValue('test2@example.com');
  await wrapper.find('form').trigger('submit.prevent');
  await flushPromises();

  expect(axiosMock).toHaveBeenCalled();
  expect(axiosMock).toHaveBeenCalledWith('accounts/profile/', {
    email: 'test2@example.com',
    password: '',
    new_password: '',
  });

  expect(wrapper.find('[data-test="success"]').exists()).toBe(true);
});

test('an error is shown when the patch fails', async () => {
  axiosMock.mockRejectedValue('Error');

  const wrapper = createWrapper();

  await wrapper.find('#email').setValue('test2@example.com');
  await wrapper.find('form').trigger('submit.prevent');
  await flushPromises();

  expect(wrapper.find('[data-test="failed"]').exists()).toBe(true);
});

test('the current password is required', async () => {
  const wrapper = createWrapper();

  await wrapper.find('#newPassword').setValue('test2');
  await wrapper.find('form').trigger('submit.prevent');

  expect(wrapper.find('#currentPasswordInvalid').exists()).toBe(true);
});

test('the new password must be different than the current password', async () => {
  const wrapper = createWrapper();

  await wrapper.find('#currentPassword').setValue('test2');
  await wrapper.find('#newPassword').setValue('test2');
  await wrapper.find('form').trigger('submit.prevent');
  await flushPromises();

  expect(wrapper.find('#newPasswordInvalid').exists()).toBe(true);
});

test('the new password must be repeated', async () => {
  const wrapper = createWrapper();

  await wrapper.find('#currentPassword').setValue('test');
  await wrapper.find('#newPassword').setValue('test2');
  await wrapper.find('#repeatPassword').setValue('test3');
  await wrapper.find('form').trigger('submit.prevent');

  expect(wrapper.find('#repeatPasswordInvalid').exists()).toBe(true);
});

test('all data is successfully submitted', async () => {
  const wrapper = createWrapper();

  await wrapper.find('#currentPassword').setValue('test');
  await wrapper.find('#newPassword').setValue('test2');
  await wrapper.find('#repeatPassword').setValue('test2');
  await wrapper.find('form').trigger('submit.prevent');
  await flushPromises();

  expect(axiosMock).toHaveBeenCalled();
  expect(axiosMock).toHaveBeenCalledWith('accounts/profile/', {
    email: 'test@example.com',
    password: 'test',
    new_password: 'test2',
  });
});
