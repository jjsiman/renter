<script setup lang="ts">
import { computed } from 'vue';
import type { PaginationContainerProps } from '@/components/PaginationContainer/PaginationContainer.d.ts';

const currentPage = defineModel<number>({ required: true });

const props = withDefaults(defineProps<PaginationContainerProps>(), {
  pageSize: 25,
});

const pages = computed(() => {
  if (props.pageSize <= 0) {
    return [];
  }
  const length = props.totalResults / props.pageSize;
  return Array.from({ length: Math.ceil(length) }, (_, i) => ++i);
});

const disablePrevious = computed(() => currentPage.value <= 1);
const disableNext = computed(() => currentPage.value >= pages.value.length);
const isCurrentPage = (page: number) => currentPage.value === page;
</script>

<template>
  <nav :aria-label="label">
    <ul class="pagination">
      <li
        class="page-item"
        :class="{ disabled: disablePrevious }"
      >
        <component
          :is="disablePrevious ? 'span' : 'a'"
          class="page-link"
          href="#"
          @click.prevent="disablePrevious ? null : currentPage--"
        >
          Previous
        </component>
      </li>
      <li
        v-for="page in pages"
        :key="page"
        class="page-item"
        :class="[isCurrentPage(page) ? 'active' : null]"
        :aria-current="isCurrentPage(page) ? 'page' : undefined"
      >
        <component
          :is="isCurrentPage(page) ? 'span': 'a'"
          class="page-link"
          href="#"
          @click.prevent="isCurrentPage(page) ? null : currentPage = page"
        >
          {{ page }}
        </component>
      </li>
      <li
        class="page-item"
        :class="{ disabled: disableNext }"
      >
        <component
          :is="disableNext ? 'span' : 'a'"
          class="page-link"
          href="#"
          @click.prevent="disableNext ? null : currentPage++"
        >
          Next
        </component>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
@import "bootstrap/scss/pagination";
</style>
