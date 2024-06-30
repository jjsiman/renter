import { expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';

import HomePage from '@/pages/HomePage.vue';
import { createTestingPinia } from '@pinia/testing';

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

  expect(wrapper.exists()).toBeTruthy();
});
