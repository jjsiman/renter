import { expect, test } from 'vitest';
import { mount } from '@vue/test-utils';

import AppFooter from '@/components/AppFooter.vue';

test('should render', () => {
  const wrapper = mount(AppFooter, {
    global: {
      stubs: ['RouterLink'],
    }
  });

  expect(wrapper.exists()).toBeTruthy();
});
