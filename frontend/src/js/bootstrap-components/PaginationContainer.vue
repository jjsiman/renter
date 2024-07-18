<script setup lang="ts">
import { computed } from 'vue';

export interface PaginationContainerProps {
  label: string;
  totalResults: number;
  pageSize?: number;
}

const currentPage = defineModel<number>({ required: true });

const props = withDefaults(defineProps<PaginationContainerProps>(), {
  pageSize: 25,
});

const pages = computed(() => {
  if (props.pageSize <= 0) {
    return 0;
  }
  return Math.ceil(props.totalResults / props.pageSize);
});

const disablePrevious = computed(() => currentPage.value <= 1);
const disableNext = computed(() => currentPage.value >= pages.value);
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
