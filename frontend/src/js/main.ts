import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';

import { routes } from './routes';

import 'styles/styles.scss';

import App from './App.vue';

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active',
});

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(router);

app.mount('#app');
