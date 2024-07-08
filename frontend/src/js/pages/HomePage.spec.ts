import { expect, test, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import HomePage from '@/pages/HomePage.vue';
import { mount } from '@vue/test-utils';

vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
  useRouter: vi.fn(() => ({
    push: () => {}
  }))
}));

test('should render', () => {
  const wrapper = mount(HomePage, {
    global: {
      plugins: [createTestingPinia({ createSpy: vi.fn })],
      stubs: ['RouterLink']
    }
  });

  expect(wrapper.exists()).toBe(true);
});
