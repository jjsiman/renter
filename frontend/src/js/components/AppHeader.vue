<script setup lang="ts">
import AuthActions from '@/components/AuthActions.vue';
import CollapseContent from '@bc/CollapseContent.vue';
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
          <i class="bi-house-heart me-1" />Renter
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
$navbar-dark-toggler-icon-bg: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-list' viewBox='0 0 16 16'><path fill-rule='evenodd' fill='#{$navbar-dark-icon-color}' d='M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5'/></svg>");

@import "bootstrap/scss/nav";
@import "bootstrap/scss/navbar";
</style>
