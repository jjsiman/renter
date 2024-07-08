import { beforeEach, expect, test, vi } from 'vitest';
import { createRouter, createWebHistory, Router } from 'vue-router';
import { isAuthenticated, routes } from '@/routes';
import { createTestingPinia } from '@pinia/testing';
import { defineComponent } from 'vue';
import { Pinia } from 'pinia';
import { useAuth } from '@/stores/auth';

const EmptyComponent = defineComponent({});

let router: Router;
let pinia: Pinia;

beforeEach(async () => {
  pinia = createTestingPinia({ createSpy: vi.fn });

  router = createRouter({
    history: createWebHistory(),
    routes: [
      ...routes,
      {
        path: '/test',
        name: 'test',
        component: EmptyComponent,
        beforeEnter: [isAuthenticated],
      }
    ],
  });

  router.push('/');
  await router.isReady();
});

test('isAuthenticated route guard allows access to guarded routes', async () => {
  const auth = useAuth(pinia);
  // @ts-expect-error: getters are writable in tests
  auth.isAuthenticated = true;

  await router.push({ name: 'test' });

  const route = router.currentRoute;
  expect(route.value.name).toBe('test');
});

test('isAuthenticated route guard redirects unauthenticated users to login', async () => {
  await router.push({ name: 'test' });

  const route = router.currentRoute;
  expect(route.value.name).toBe('login');
});
