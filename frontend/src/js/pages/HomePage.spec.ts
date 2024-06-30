import { expect, test } from 'vitest';
import { mount } from '@vue/test-utils';

import HomePage from '@/pages/HomePage.vue';

test('should render', () => {
  const wrapper = mount(HomePage, {
    global: {
      stubs: ['RouterLink']
    }
  });

  expect(wrapper.exists()).toBeTruthy();
});
