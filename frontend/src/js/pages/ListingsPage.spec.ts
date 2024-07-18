import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import axios, { PaginatedListResponse } from '@/services/axios';
import { createRouter, createWebHistory, Router, RouterLink } from 'vue-router';
import { flushPromises, mount, VueWrapper } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { i18n } from '@/i18n';
import { Listing } from '@/components/ListingCard.vue';
import ListingsPage from '@/pages/ListingsPage.vue';
import { routes } from '@/routes';

const listings: Listing[] = Array.from({ length: 50 }, (_, index) => ({
  id: index,
  title: `Test ${index}`,
  property: {
    id: index,
    unit: `${index}A`,
    bedrooms: Math.floor(Math.random() * 5),
    bathrooms: Math.floor(Math.random() * 5),
    square_footage: Math.floor(Math.random() * 500),
  },
  price: String(Math.floor(Math.random() * 10000)),
}));

const response: PaginatedListResponse<Listing> = {
  count: listings.length,
  next: null,
  previous: null,
  results: listings,
};

const axiosMock = vi.spyOn(axios, 'get').mockResolvedValue({ data: response });

let router: Router;
let wrapper: VueWrapper;

beforeEach(async () => {
  router = createRouter({
    history: createWebHistory(),
    routes,
  });

  router.push('/');
  await router.isReady();

  wrapper = mount(ListingsPage, {
    global: {
      plugins: [router, i18n(), createTestingPinia({ createSpy: vi.fn })],
    },
  });
  await flushPromises();
});

afterEach(() => {
  vi.clearAllMocks();
});

test('it renders', () => {
  expect(wrapper.exists()).toBe(true);
});

test('error is shown when API call fails', async () => {
  axiosMock.mockRejectedValueOnce(new Error());

  await router.push({ query: { q: 'Test' } });
  await flushPromises();

  expect(wrapper.find('[data-test="error"]').exists()).toBe(true);
});

test('user can navigate to next page of data', async () => {
  await wrapper.findAll('.page-link')[2].trigger('click');
  await flushPromises();

  expect(axiosMock).toHaveBeenCalled();
  expect(axiosMock.mock.calls[1][0]).toContain('page=2');
});

test('user can query the data to filter it', async () => {
  await wrapper.find('#searchQuery').setValue('Test');
  await wrapper.find('form').trigger('submit.prevent');
  await flushPromises();

  expect(axiosMock).toHaveBeenCalled();
  expect(axiosMock.mock.calls[1][0]).toContain('q=Test');
});

test('no results found message is shown when results are empty', async () => {
  axiosMock.mockResolvedValueOnce({ data: { results: [], count: 0 } });

  await wrapper.find('#searchQuery').setValue('Test');
  await wrapper.find('form').trigger('submit.prevent');
  await flushPromises();

  expect(wrapper.find('[data-test="noResults"]').exists()).toBe(true);
});

test('user can click on a listing to route to the detail page', async () => {
  const spy = vi.spyOn(router, 'push');
  await wrapper.findAll('[data-test="listing"]')[1].findComponent(RouterLink).trigger('click');

  expect(spy).toHaveBeenCalled();
  expect(spy).toHaveBeenCalledWith({ name: 'listing-detail', params: { id: 1 } });
});
