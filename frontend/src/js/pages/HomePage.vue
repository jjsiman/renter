<script setup lang="ts">
import CardContainer from '@bc/CardContainer.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons/faClipboardCheck';
import { faHouseCircleCheck } from '@fortawesome/free-solid-svg-icons/faHouseCircleCheck';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { faUserShield } from '@fortawesome/free-solid-svg-icons/faUserShield';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const query = ref('');
</script>

<template>
  <DefaultLayout :show-footer="true">
    <section class="container-fluid bg-body-secondary mb-5 pt-5">
      <div class="row">
        <div class="col">
          <h1 class="text-center display-4 fw-medium">
            Welcome to Renter
          </h1>
          <p class="text-center lead">
            The most straightforward way to rent a home.
          </p>
        </div>
      </div>
      <div class="row justify-content-center py-5">
        <div class="col col-sm-6">
          <form
            @submit.prevent="router.push({ name: 'listing-list', query: { q: query }})"
          >
            <div class="input-group input-group-lg">
              <button
                type="submit"
                class="btn btn-primary"
              >
                <FontAwesomeIcon
                  :icon="faMagnifyingGlass"
                  size="1x"
                  class=" align-middle text-white"
                /><span class="visually-hidden">Search</span>
              </button>
              <input
                id="listingSearch"
                v-model="query"
                type="text"
                class="form-control"
                placeholder="Search active listings"
                aria-label="search"
              >
            </div>
          </form>
        </div>
      </div>
    </section>
    <section
      class="
            container-fluid
            mb-5"
    >
      <div class="row justify-content-center g-3 pb-4 text-center">
        <div class="col col-sm-3">
          <CardContainer class="h-100 shadow">
            <div class="card-body d-flex flex-column">
              <div class="card-text p-3">
                <FontAwesomeIcon
                  :icon="faUserShield"
                  size="3x"
                  class="text-info"
                />
              </div>
              <div class="h5 card-text w-100">
                No ads
              </div>
            </div>
          </CardContainer>
        </div>
        <div class="col col-sm-3">
          <CardContainer class="h-100 shadow">
            <div class="card-body d-flex flex-column">
              <div class="card-text p-3">
                <FontAwesomeIcon
                  :icon="faHouseCircleCheck"
                  size="3x"
                  class="text-info"
                />
              </div>
              <div class="h5 card-text w-100">
                Floorplan required
              </div>
            </div>
          </CardContainer>
        </div>
        <div class="col col-sm-3">
          <CardContainer class="h-100 shadow">
            <div class="card-body d-flex flex-column">
              <div class="card-text p-3">
                <FontAwesomeIcon
                  :icon="faClipboardCheck"
                  size="3x"
                  class="text-info"
                />
              </div>
              <div class="h5 card-text w-100">
                Satisfaction guaranteed
              </div>
            </div>
          </CardContainer>
        </div>
      </div>
    </section>
    <section class="container-fluid mb-5">
      <div class="row justify-content-center">
        <div class="col col-sm-6">
          <figure class="text-center text-bg-light rounded p-4">
            <blockquote class="blockquote">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In et lorem ut erat porta tempor vitae quis ligula. Phasellus velit dolor, vulputate tincidunt condimentum sed, fringilla quis felis. Proin vitae leo ac eros hendrerit tristique eu eu elit. Pellentesque id ante sapien. Nulla luctus urna id lacus pulvinar, nec cursus tortor mattis. Vivamus malesuada purus ac iaculis finibus. Donec vitae iaculis nisi.</p>
            </blockquote>
            <figcaption class="blockquote-footer text-bg-light mb-0">
              <cite title="author">Lorum I.</cite>, renter in <cite title="city">New York, NY</cite>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
    <section class="container-fluid py-5 bg-body-secondary">
      <div class="row justify-content-center">
        <div class="col-9">
          <h2 class="h4">
            Trending in your area
          </h2>
        </div>
      </div>
      <div class="row justify-content-center g-3">
        <div class="col col-sm-3">
          <CardContainer>
            <img
              src="/images/apartment-1.jpg"
              class="card-img-top"
              alt="Apartment 1"
            ><div class="card-body">
              <h3 class="h5 card-title">
                Lorum Ipsum Apt 1
              </h3>
              <p class="card-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </CardContainer>
        </div>
        <div class="col col-sm-3">
          <CardContainer>
            <img
              src="/images/apartment-2.jpg"
              class="card-img-top"
              alt="Apartment 2"
            ><div class="card-body">
              <h3 class="h5 card-title">
                Lorum Ipsum Apt 2
              </h3>
              <p class="card-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </CardContainer>
        </div>
        <div class="col col-sm-3">
          <CardContainer>
            <img
              src="/images/apartment-3.jpg"
              class="card-img-top"
              alt="Apartment 3"
            ><div class="card-body">
              <h3 class="h5 card-title">
                Lorum Ipsum Apt 3
              </h3>
              <p class="card-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </CardContainer>
        </div>
      </div>
    </section>
    <section class="container-fluid mb-5 pt-5">
      <div class="row justify-content-center">
        <div class="col col-sm-6">
          <h3 class="h5">
            Disclaimer
          </h3>
          <p><small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In et lorem ut erat porta tempor vitae quis ligula. Phasellus velit dolor, vulputate tincidunt condimentum sed, fringilla quis felis. Proin vitae leo ac eros hendrerit tristique eu eu elit. Pellentesque id ante sapien. Nulla luctus urna id lacus pulvinar, nec cursus tortor mattis. Vivamus malesuada purus ac iaculis finibus. Donec vitae iaculis nisi.</small></p>
          <p><small>Nam laoreet, orci ut tempor rhoncus, nisi tellus elementum justo, nec viverra quam leo at nisl. Duis justo turpis, facilisis eget malesuada sed, mattis a libero. Vestibulum bibendum odio id ex vestibulum, efficitur ultricies libero semper. Donec quis accumsan lacus. Vivamus id turpis placerat, placerat mi a, finibus felis. Morbi enim leo, efficitur ut pellentesque eu, dictum mollis magna. Suspendisse pulvinar vestibulum justo nec finibus. Suspendisse scelerisque dolor et diam congue congue. Morbi vel sem nulla. Etiam id ipsum faucibus lectus venenatis ultricies a sed ante. Cras eget condimentum tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur pharetra hendrerit augue ut aliquam. Aenean pellentesque mi eget fringilla facilisis.</small></p>
        </div>
      </div>
    </section>
  </DefaultLayout>
</template>
