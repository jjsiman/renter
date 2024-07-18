import { expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import PlaceholderWrapper from '@bc/PlaceholderWrapper.vue';

test('placeholders slot is shown while loading', () => {
  const wrapper = mount(PlaceholderWrapper, {
    props: {
      loading: true,
    },
    slots: {
      placeholders: '<div id="placeholders"></div>',
      default: '<div id="default"></div>',
    },
  });

  expect(wrapper.find('#placeholders').exists()).toBe(true);
});

test('default content shown while not loading', () => {
  const wrapper = mount(PlaceholderWrapper, {
    props: {
      loading: false,
    },
    slots: {
      placeholders: '<div id="placeholders"></div>',
      default: '<div id="default"></div>',
    },
  });

  expect(wrapper.find('#default').exists()).toBe(true);
});

test('placeholder wrapper has aria-hidden="false"', () => {
  const wrapper = mount(PlaceholderWrapper, {
    props: {
      loading: true,
      animation: 'wave',
    },
    slots: {
      placeholders: '<div id="placeholders"></div>',
      default: '<div id="default"></div>',
    },
  });

  const placeholderWrapper = wrapper.find('.placeholder-wave');
  expect(placeholderWrapper.exists()).toBe(true);
  expect(placeholderWrapper.attributes('aria-hidden')).toBe('true');
});
