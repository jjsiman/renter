import '@styles/styles.scss';
import { createRouter, createWebHistory } from 'vue-router';
import App from '@/App.vue';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { routes } from '@/routes';

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
