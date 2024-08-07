import { RouteLocationNormalized } from 'vue-router';
import { useAuth } from '@/stores/auth';

const AboutPage = () => import('@/pages/AboutPage.vue');
const HomePage = () => import('@/pages/HomePage.vue');
const ListingPage = () => import('@/pages/ListingPage.vue');
const ListingsPage = () => import('@/pages/ListingsPage.vue');
const LoginPage = () => import('@/pages/LoginPage.vue');
const ProfilePage = () => import('@/pages/ProfilePage.vue');
const SignUpPage = () => import('@/pages/SignUpPage.vue');

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
    path: '/listings',
    children: [
      {
        path: '',
        name: 'listing-list',
        component: ListingsPage,
      },
      {
        path: ':id',
        name: 'listing-detail',
        component: ListingPage,
      },
    ],
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
  },
];
