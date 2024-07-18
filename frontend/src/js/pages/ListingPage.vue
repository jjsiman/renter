<script setup lang="ts">
import ListingCard, { Listing } from '@/components/ListingCard.vue';
import { ref, watch } from 'vue';
import axios from '@/services/axios';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import { useRoute } from 'vue-router';

const listing = ref<Listing>();
const error = ref(false);
const loading = ref(false);

const route = useRoute();

watch(() => route.params.id, fetchData, { immediate: true });

async function fetchData(id: string | string[]) {
  loading.value = true;
  error.value = false;

  try {
    const resp = await axios.get<Listing>(`listings/${id}/`);
    listing.value = resp.data;
  }
  catch (e) {
    error.value = true;
  }
  finally {
    loading.value = false;
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
      class="container-fluid py-5"
    >
      <div class="row justify-content-center">
        <div class="col col-md-6">
          <ListingCard
            :listing="listing"
            :loading="loading"
          />
        </div>
      </div>
    </div>
  </Defaultlayout>
</template>
