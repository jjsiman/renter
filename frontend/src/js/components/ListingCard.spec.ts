import { beforeEach, expect, test } from 'vitest';
import ListingCard, { Listing } from '@/components/ListingCard.vue';
import { mount, VueWrapper } from '@vue/test-utils';
import { i18n } from '@/i18n';

const listing: Listing = {
  id: 1,
  title: 'Test Listing',
  property: {
    id: 1,
    unit: '1A',
    bedrooms: 1,
    bathrooms: 2,
    square_footage: 100,
  },
  price: '123.45',
};

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = mount(ListingCard, {
    props: {
      loading: false,
      listing,
    },
    global: {
      plugins: [i18n()],
    },
  });
});

test('it renders', () => {
  expect(wrapper.exists()).toBeTruthy();
});

test('placeholder is shown while loading', async () => {
  expect(wrapper.findAll('.placeholder').length).toBe(0);
  await wrapper.setProps({ loading: true });
  expect(wrapper.findAll('.placeholder').length).toBeGreaterThan(0);
});

test('it renders the listing details', () => {
  expect(wrapper.find('[data-test="title"]').text()).toBe(listing.title);
  expect(wrapper.find('[data-test="price"]').text()).toContain(listing.price);
  expect(wrapper.find('[data-test="bedrooms"]').text()).toContain(listing.property.bedrooms);
  expect(wrapper.find('[data-test="bathrooms"]').text()).toContain(listing.property.bathrooms);
  expect(wrapper.find('[data-test="squareFootage"]').text()).toContain(listing.property.square_footage);
});
