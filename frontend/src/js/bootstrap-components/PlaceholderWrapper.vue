<script setup lang="ts">
interface Props {
  loading: boolean;
  animation?: 'glow' | 'wave';
}

withDefaults(defineProps<Props>(), {
  animation: 'glow',
});
</script>

<template>
  <div
    v-if="loading"
    :class="`placeholder-${animation}`"
    aria-hidden="true"
  >
    <slot name="placeholders" />
  </div>
  <slot v-else />
</template>

<style lang="scss">
@import "bootstrap/scss/placeholders";
</style>
