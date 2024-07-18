<script setup lang="ts">
import { computed, ref } from 'vue';
import { Bezier } from 'bezier-js';

// Mimic CSS easing transition
const bezier = new Bezier([{ x: 0, y: 0 }, { x: 0.25, y: 0.1 }, { x: 0.25, y: 1 }, { x: 1, y: 1 }]);

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    default: 350,
  },
  buttonClass: {
    type: String,
    default: '',
  },
  contentClass: {
    type: String,
    default: '',
  },
});

const showContent = ref(false);
const isAnimating = ref(false);
const showClass = ref(false);

const zero = ref(0);

const contentClassObject = computed(() => ({
  [props.contentClass]: true,
  'collapse': !isAnimating.value,
  'overflow-hidden': isAnimating.value,
  'show': showClass.value,
}));

function onBeforeEnter(el: Element) {
  (el as HTMLElement).style.height = '0px';
  isAnimating.value = true;
}

function onEnter(el: Element, done: () => void) {
  zero.value = performance.now();
  requestAnimationFrame(() => animateIn(zero.value, el, done));
}

function onAfterEnter() {
  isAnimating.value = false;
  showClass.value = true;
}

function onBeforeLeave(el: Element) {
  (el as HTMLElement).style.height = `${el.scrollHeight}px`;
  isAnimating.value = true;
  showClass.value = false;
}

function onLeave(el: Element, done: () => void) {
  zero.value = performance.now();
  requestAnimationFrame(() => animateOut(zero.value, el, done));
}

function onAfterLeave() {
  isAnimating.value = false;
}

function animateIn(timestamp: number, el: Element, done: () => void) {
  const value = (timestamp - zero.value) / props.duration;
  if (value < 1) {
    (el as HTMLElement).style.height = `${ease(value) * el.scrollHeight}px`;
    requestAnimationFrame(t => animateIn(t, el, done));
  }
  else {
    (el as HTMLElement).style.height = '';
    done();
  };
}

function animateOut(timestamp: number, el: Element, done: () => void) {
  const value = (timestamp - zero.value) / props.duration;
  if (value < 1) {
    (el as HTMLElement).style.height = `${ease(1 - value) * el.scrollHeight}px`;
    requestAnimationFrame(t => animateOut(t, el, done));
  }
  else {
    (el as HTMLElement).style.height = '';
    done();
  }
}

function ease(t: number): number {
  return bezier.get(t).y;
}
</script>

<template>
  <button
    type="button"
    class="btn"
    :class="buttonClass"
    :aria-controls="id"
    :aria-expanded="showClass"
    data-test="toggle"
    @click="showContent = !showContent"
  >
    <slot name="toggle" />
  </button>
  <Transition
    :css="false"
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @after-enter="onAfterEnter"
    @before-leave="onBeforeLeave"
    @leave="onLeave"
    @after-leave="onAfterLeave"
  >
    <div
      v-show="showContent"
      :id
      :class="contentClassObject"
      data-test="content"
    >
      <slot name="content" />
    </div>
  </Transition>
</template>
