import { expect, test } from 'vitest';
import PaginationContainer, { PaginationContainerProps } from '@bc/PaginationContainer.vue';
import { mount } from '@vue/test-utils';

const createWrapper = (props: PaginationContainerProps, initialModelValue: number) => {
  const componentProps = {
    ...props,
    'modelValue': initialModelValue,
    'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e }),
  };

  const wrapper = mount(PaginationContainer, {
    props: componentProps,
  });
  return wrapper;
};

test.each([
  [1, 1, 1],
  [0, 25, 0],
  [1, 0, 0],
  [10, 5, 2],
  [11, 5, 3],
  [10, 50, 1],
])('with %i result(s) and a page size of %i, renders %i page(s)', (totalResults: number, pageSize: number, expected: number) => {
  const wrapper = createWrapper({ label: 'Test', totalResults, pageSize }, 1);

  expect(wrapper.findAll('li.page-item').length).toBe(expected + 2); // +2 for previous and next
});

test('clicking a page updates the model', async () => {
  const wrapper = createWrapper({ label: 'Test', totalResults: 10, pageSize: 1 }, 1);

  const page5 = wrapper.findAll('li.page-item > .page-link').at(5);
  console.log(page5?.html());
  await page5?.trigger('click');

  expect(wrapper.props('modelValue')).toBe(5);
});

test('current page is unclickable', async () => {
  const wrapper = createWrapper({ label: 'Test', totalResults: 10, pageSize: 1 }, 5);

  const next = wrapper.findAll('li.page-item').at(5);

  await next?.find('.page-link').trigger('click');

  expect(wrapper.props('modelValue')).toBe(5);
});

test('previous is unclickable on the first page', async () => {
  const wrapper = createWrapper({ label: 'Test', totalResults: 10, pageSize: 1 }, 1);

  const next = wrapper.findAll('li.page-item').at(0);
  expect(next?.classes('disabled')).toBe(true);

  await next?.find('.page-link').trigger('click');

  expect(wrapper.props('modelValue')).toBe(1);
});

test('next is unclickable on the last page', async () => {
  const wrapper = createWrapper({ label: 'Test', totalResults: 10, pageSize: 1 }, 10);

  const next = wrapper.findAll('li.page-item').at(-1);
  expect(next?.classes('disabled')).toBe(true);

  await next?.find('.page-link').trigger('click');

  expect(wrapper.props('modelValue')).toBe(10);
});
