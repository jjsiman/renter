import { expect, test } from 'vitest';
import { mount } from '@vue/test-utils';

import DefaultLayout from '@/layouts/DefaultLayout.vue';
import AppFooter from '@/components/AppFooter.vue';

test('should render', () => {
  const wrapper = mount(DefaultLayout, {
    shallow: true
  });

  expect(wrapper.exists()).toBeTruthy();
});

test('footer can be shown', () => {
  const wrapper = mount(DefaultLayout, {
    props: {
      showFooter: true,
    },
    shallow: true,
  });

  expect(wrapper.findComponent(AppFooter).exists()).toBe(true);
});
