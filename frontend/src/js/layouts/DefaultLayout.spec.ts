import { expect, test } from 'vitest';
import AppFooter from '@/components/AppFooter.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import { mount } from '@vue/test-utils';

test('should render', () => {
  const wrapper = mount(DefaultLayout, {
    shallow: true
  });

  expect(wrapper.exists()).toBe(true);
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
