import '@styles/styles.scss';
import { createRouter, createWebHistory } from 'vue-router';
import App from '@/App.vue';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { i18n } from '@/i18n';
import { routes } from '@/routes';

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkExactActiveClass: 'active',
  scrollBehavior(to, _, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
      };
    }
    else if (savedPosition) {
      return savedPosition;
    }
    else {
      return { top: 0 };
    }
  },
});

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(i18n());

app.mount('#app');
