<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';

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
