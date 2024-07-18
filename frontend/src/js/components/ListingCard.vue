<script setup lang="ts">
import CardContainer from '@bc/CardContainer.vue';
import PlaceholderWrapper from '@bc/PlaceholderWrapper.vue';
import { useI18n } from 'vue-i18n';

export interface Property {
  id: number;
  unit: string;
  bedrooms: number;
  bathrooms: number;
  square_footage: number;
}

export interface Listing {
  id: number;
  title: string;
  property: Property;
  price: string;
};

const { n, t } = useI18n({
  useScope: 'global',
  messages: {
    en: {
      bedroom: 'bedroom | bedrooms',
      bathroom: 'bathroom | bathrooms',
    },
  },
});

defineProps<{
  listing: Listing | undefined;
  loading: boolean;
}>();
</script>

<template>
  <PlaceholderWrapper :loading="loading">
    <template #placeholders>
      <CardContainer>
        <div class="card-body">
          <h1 class="h3 card-title">
            <span class="placeholder col-8 rounded" />
          </h1>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <span class="placeholder col-4 rounded" />
            </li>
            <li class="list-group-item">
              <span class="placeholder col-3 rounded" />
            </li>
            <li class="list-group-item">
              <span class="placeholder col-4 rounded" />
            </li>
            <li class="list-group-item">
              <span class="placeholder col-3 rounded" />
            </li>
          </ul>
        </div>
      </CardContainer>
    </template>
    <CardContainer v-if="listing">
      <div class="card-body">
        <h1
          class="h3 card-title"
          data-test="title"
        >
          {{ listing.title }}
        </h1>
        <ul class="list-group list-group-flush">
          <li
            class="list-group-item"
            data-test="price"
          >
            <i class="bi-cash-stack me-2"><span class="visually-hidden">Price</span></i> {{ n(+listing.price, 'currency') }}/month
          </li>
          <li
            class="list-group-item"
            data-test="bedrooms"
          >
            <i class="bi-moon-stars-fill me-2" /> {{ listing.property.bedrooms }} {{ t('bedroom', listing.property.bedrooms) }}
          </li>
          <li
            class="list-group-item"
            data-test="bathrooms"
          >
            <i class="bi-droplet me-2" /> {{ listing.property.bathrooms }} {{ t('bathroom', listing.property.bathrooms) }}
          </li>
          <li
            class="list-group-item"
            data-test="squareFootage"
          >
            <i class="bi-rulers me-2"><span class="visually-hidden">Square Footage</span></i> {{ listing.property.square_footage }} sq. ft.
          </li>
        </ul>
      </div>
    </CardContainer>
  </PlaceholderWrapper>
</template>
