import { mount } from '@vue/test-utils';
import { expect, test } from 'vitest';

import CollapseContent from '@/components/CollapseContent.vue';

test('should render', () => {
  const wrapper = mount(CollapseContent, {
    props: {
      id: 'test'
    }
  });

  expect(wrapper.exists()).toBe(true);
});

test('content is shown and hidden by clicking the toggle', async () => {
  const wrapper = mount(CollapseContent, {
    props: {
      id: 'test'
    },
    attachTo: document.body,
  });

  const toggle = wrapper.find('[data-test="toggle"]');
  const content = wrapper.find('[data-test="content"]');

  expect(content.isVisible()).toBe(false);
  await toggle.trigger('click');
  expect(content.isVisible()).toBe(true);
  await toggle.trigger('click');
  expect(content.isVisible()).toBe(false);
});
