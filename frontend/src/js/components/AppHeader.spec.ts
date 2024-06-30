import { expect, test } from 'vitest';
import { mount } from '@vue/test-utils';

import AppHeader from '@/components/AppHeader.vue';

test('should render', () => {
  const wrapper = mount(AppHeader, {
    global: {
      stubs: ['RouterLink'],
    }
  });

  expect(wrapper.exists()).toBeTruthy();
});
