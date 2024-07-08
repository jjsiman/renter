import { expect, test } from 'vitest';
import { mount } from '@vue/test-utils';

import CardContainer from '@/components/CardContainer.vue';

test('should render', () => {
  const wrapper = mount(CardContainer, {
    global: {
      stubs: ['RouterLink'],
    }
  });

  expect(wrapper.exists()).toBe(true);
});
