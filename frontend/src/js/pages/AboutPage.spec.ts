import { expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';

import AboutPage from '@/pages/AboutPage.vue';
import { createTestingPinia } from '@pinia/testing';

vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
  useRouter: vi.fn(() => ({
    push: () => {}
  }))
}));

test('should render', () => {
  const wrapper = mount(AboutPage, {
    global: {
      plugins: [createTestingPinia({ createSpy: vi.fn })],
      stubs: ['RouterLink']
    }
  });

  expect(wrapper.exists()).toBeTruthy();
});
