import { expect, test, vi } from 'vitest';
import AboutPage from '@/pages/AboutPage.vue';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';

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

  expect(wrapper.exists()).toBe(true);
});
