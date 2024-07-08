import { expect, test } from 'vitest';
import CardContainer from '@/components/CardContainer.vue';
import { mount } from '@vue/test-utils';

test('should render', () => {
  const wrapper = mount(CardContainer, {
    global: {
      stubs: ['RouterLink'],
    }
  });

  expect(wrapper.exists()).toBe(true);
});
