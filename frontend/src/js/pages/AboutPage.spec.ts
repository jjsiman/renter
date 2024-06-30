import { expect, test } from 'vitest';
import { mount } from '@vue/test-utils';

import AboutPage from '@/pages/AboutPage.vue';

test('should render', () => {
  const wrapper = mount(AboutPage, {
    global: {
      stubs: ['RouterLink']
    }
  });

  expect(wrapper.exists()).toBeTruthy();
});
