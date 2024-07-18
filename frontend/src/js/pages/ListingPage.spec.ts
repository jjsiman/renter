import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { createRouter, createWebHistory, Router } from 'vue-router';
import { flushPromises, mount, VueWrapper } from '@vue/test-utils';
import axios from '@/services/axios';
import { createTestingPinia } from '@pinia/testing';
import { i18n } from '@/i18n';
import { Listing } from '@/components/ListingCard.vue';
import ListingPage from '@/pages/ListingPage.vue';
import { routes } from '@/routes';

const listings: Listing[] = [{
  id: 1,
  title: 'Test',
  property: {
    id: 1,
    unit: '1A',
    bedrooms: 1,
    bathrooms: 1,
    square_footage: 100,
  },
  price: '100.00',
}];

const axiosMock = vi.spyOn(axios, 'get').mockResolvedValue(listings);

let router: Router;
let wrapper: VueWrapper;

beforeEach(async () => {
  router = createRouter({
    history: createWebHistory(),
    routes,
  });

  router.push('/');
  await router.isReady();

  wrapper = mount(ListingPage, {
    global: {
      plugins: [router, i18n(), createTestingPinia({ createSpy: vi.fn })],
    },
  });
});

afterEach(() => {
  vi.resetAllMocks();
});

test('it renders', () => {
  expect(wrapper.exists()).toBe(true);
});

test('API is called when the id query param changes', async () => {
  expect(axiosMock).toHaveBeenCalledTimes(1);
  await router.push({ params: { id: 2 } });
  expect(axiosMock).toHaveBeenCalledTimes(2);
});

test('error is shown when API call fails', async () => {
  axiosMock.mockRejectedValue(new Error());

  await router.push({ params: { id: 2 } });
  await flushPromises();

  expect(wrapper.find('[data-test="error"]').exists()).toBe(true);
});
