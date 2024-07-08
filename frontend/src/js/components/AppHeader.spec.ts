import { expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';

import AppHeader from '@/components/AppHeader.vue';
import { createTestingPinia } from '@pinia/testing';

vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
  useRouter: vi.fn(() => ({
    push: () => {}
  }))
}));

test('should render', () => {
  const wrapper = mount(AppHeader, {
    global: {
      plugins: [createTestingPinia({ createSpy: vi.fn })],
      stubs: ['RouterLink'],
    },
  });

  expect(wrapper.exists()).toBe(true);
});
