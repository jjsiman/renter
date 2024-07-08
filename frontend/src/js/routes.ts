import HomePage from '@/pages/HomePage.vue';
import AboutPage from '@/pages/AboutPage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import ProfilePage from '@/pages/ProfilePage.vue';
import SignUpPage from '@/pages/SignUpPage.vue';
import { useAuth } from '@/stores/auth';
import { RouteLocationNormalized } from 'vue-router';

export const isAuthenticated = (to: RouteLocationNormalized) => {
  const auth = useAuth();

  if (auth.isAuthenticated) {
    return true;
  }

  return { name: 'login', query: { next: to.path } };
};

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
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfilePage,
    beforeEnter: [isAuthenticated],
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpPage,
  }
];
