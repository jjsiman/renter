<script setup lang="ts">
import AuthActions from '@/components/AuthActions.vue';
import CollapseContent from '@bc/CollapseContent.vue';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons/faHouseUser';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
</script>

<template>
  <header>
    <nav
      class="navbar navbar-expand-lg bg-dark sticky-top"
      data-bs-theme="dark"
    >
      <div class="container-xxl">
        <RouterLink
          class="navbar-brand"
          :to="{ name: 'home' }"
        >
          <FontAwesomeIcon :icon="faHouseUser" /> Renter
        </RouterLink>
        <CollapseContent
          id="navbarCollapse"
          button-class="navbar-toggler"
          content-class="navbar-collapse"
        >
          <template #toggle>
            <span class="visually-hidden">Toggle navigation menu</span><span
              class="navbar-toggler-icon"
            />
          </template>
          <template #content>
            <ul class="navbar-nav me-auto">
              <li>
                <RouterLink
                  class="nav-link"
                  :to="{ name: 'home' }"
                >
                  Home
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  class="nav-link"
                  :to="{ name: 'listing-list' }"
                >
                  Listings
                </RouterLink>
              </li>
            </ul>
            <div class="d-flex">
              <AuthActions />
            </div>
          </template>
        </CollapseContent>
      </div>
    </nav>
  </header>
</template>

<style lang="scss">
// Use bootstrap-icon list icon
$navbar-toggler-font-size: 1rem;
$navbar-dark-toggler-icon-bg: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill='#{$navbar-dark-icon-color}' d='M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z'/></svg>");

@import "bootstrap/scss/nav";
@import "bootstrap/scss/navbar";
</style>
