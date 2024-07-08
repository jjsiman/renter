<script setup lang="ts">
import AppFooter from '@/components/AppFooter.vue';
import AppHeader from '@/components/AppHeader.vue';

defineProps({
  showFooter: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
    <AppHeader />
    <main class="bg-body-secondary">
        <slot></slot>
    </main>
    <AppFooter v-if="showFooter" />
</template>
