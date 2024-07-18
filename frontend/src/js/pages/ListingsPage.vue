<script setup lang="ts">
import axios, { PaginatedListResponse } from '@/services/axios';
import { ref, watch } from 'vue';
import { stringifyQuery, useRoute } from 'vue-router';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import type { Listing } from '@/components/ListingCard.vue';
import PaginationContainer from '@bc/PaginationContainer.vue';
import PlaceholderWrapper from '@bc/PlaceholderWrapper.vue';
import { useRouteQuery } from '@vueuse/router';

const PageSize = 25;

const route = useRoute();

const q = useRouteQuery('q');
const page = useRouteQuery('page', '0', { transform: Number });

const searchQuery = ref(q.value);
const listings = ref<Listing[]>([]);
const totalListings = ref(0);
const isLoading = ref(false);
const error = ref(false);

watch(() => route.query, fetchListings, { immediate: true, deep: true });

function onSearch() {
  q.value = searchQuery.value;
}

async function fetchListings() {
  if (page.value < 1) {
    return page.value = 1;
  }

  const offset = (page.value - 1) * PageSize;

  isLoading.value = true;
  error.value = false;
  try {
    // The `page` parameter will be included but is harmless
    const resp = await axios.get<PaginatedListResponse<Listing>>(`listings/?${stringifyQuery(route.query)}&limit=${PageSize}&offset=${offset}`);
    listings.value = resp.data.results;
    totalListings.value = resp.data.count;
  }
  catch (e) {
    error.value = true;
  }
  finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <DefaultLayout>
    <div
      v-if="error"
      class="vh-100 py-5 text-center"
      data-test="error"
    >
      <h1 class="h3 display-7">
        Uh oh! Something went wrong
      </h1>
      <p>We couldn't load any listings at this time. Please try again!</p>
    </div>
    <div
      v-else
      class="container-md py-5"
    >
      <div class="row mb-4">
        <div class="col">
          <h1 class="h2">
            Active Listings
          </h1>
          <form @submit.prevent="onSearch">
            <div class="input-group mb-3">
              <input
                id="searchQuery"
                v-model="searchQuery"
                type="text"
                class="form-control"
                aria-label="search"
              >
              <button
                type="submit"
                class="btn btn-primary"
              >
                <i class="bi-search text-white"><span class="visually-hidden">Search</span></i>
              </button>
            </div>
          </form>
          <PlaceholderWrapper :loading="isLoading">
            <template #placeholders>
              <ul class="list-group rounded">
                <li
                  class="list-group-item placeholder-wave"
                  v-for="row in 25"
                  :key="row"
                >
                  <span
                    class="placeholder rounded"
                    :class="`col-${Math.round(Math.random() * 2) + 3}`"
                  />
                </li>
              </ul>
            </template>
            <ul
              class="list-group rounded"
            >
              <li
                v-for="listing in listings"
                :key="listing.id"
                class="list-group-item"
              >
                <RouterLink
                  :to="{ name: 'listing-detail', params: { id: listing.id } }"
                  class="btn"
                  data-test="listing"
                >
                  {{ listing.title }} - <small class="text-info text-sm">{{ $n(+listing.price, 'currency') }}/month</small>
                </RouterLink>
              </li>
              <li
                v-if="!totalListings"
                class="list-group-item"
                data-test="noResults"
              >
                No results found. Please try changing your search.
              </li>
            </ul>
          </PlaceholderWrapper>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="d-flex justify-content-center rounded">
            <PaginationContainer
              v-model="page"
              :total-results="totalListings"
              label="Listings page navigation"
            />
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>
