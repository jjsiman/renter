import HomePage from '@/pages/HomePage.vue';
import AboutPage from '@/pages/AboutPage.vue';

export const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutPage,
  }
];
