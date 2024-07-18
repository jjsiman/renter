import { expect, Mock, test, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import HomePage from '@/pages/HomePage.vue';
import { mount } from '@vue/test-utils';
import { useRouter } from 'vue-router';

vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
  useRouter: vi.fn(() => ({
    push: () => {},
  })),
}));

const createWrapper = () => mount(HomePage, {
  global: {
    plugins: [createTestingPinia({ createSpy: vi.fn })],
    stubs: ['RouterLink'],
  },
});

test('should render', () => {
  const wrapper = createWrapper();

  expect(wrapper.exists()).toBe(true);
});

test('user can enter a search term and go to the listings page', async () => {
  const push = vi.fn();
  (useRouter as Mock).mockImplementationOnce(() => ({
    push,
  }));

  const wrapper = createWrapper();

  await wrapper.find('#listingSearch').setValue('test');
  await wrapper.find('form').trigger('submit.prevent');

  expect(push).toHaveBeenCalledOnce();
  expect(push).toHaveBeenCalledWith({ name: 'listing-list', query: { q: 'test' } });
});
