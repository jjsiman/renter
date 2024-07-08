import { expect, test } from 'vitest';
import AppFooter from '@/components/AppFooter.vue';
import { mount } from '@vue/test-utils';

test('should render', () => {
  const wrapper = mount(AppFooter, {
    global: {
      stubs: ['RouterLink'],
    }
  });

  expect(wrapper.exists()).toBe(true);
});
