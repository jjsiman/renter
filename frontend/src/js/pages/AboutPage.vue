<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue';
</script>

<template>
  <DefaultLayout :show-footer="true">
    <div class="container-xxl py-5">
      <div class="row">
        <div class="col-10 col-sm-6 offset-1 offset-sm-3">
          <h1>About</h1>
          <section>
            <h2 class="h5">
              What is Renter?
            </h2>
            <p>Renter is a real estate website clone built as a "portfolio" of sorts.</p>
            <p>
              The website is a Vue single page application powered by a Django REST API. All data is
              obviously fake and for demonstration purposes only. I'm also clearly not a designer, so the
              UI and UX represent my best efforts and intuition as a result of several years of feature
              development.
            </p>
          </section>
          <section>
            <h2 class="h5">
              Technologies
            </h2>
            <ul>
              <li>Django</li>
              <li>Vue</li>
              <li>Docker</li>
              <li>Vite</li>
            </ul>
            <p>Also:</p>
            <ul>
              <li>Typescript + SCSS</li>
              <li>PostgreSQL</li>
              <li>Bootstrap + Bootstrap Icons</li>
              <li>Django Rest Framework</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<style lang="scss">
#app {
    height: 100vh;
}
</style>
