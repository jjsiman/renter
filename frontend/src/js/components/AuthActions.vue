<script setup lang="ts">
import { useAuth } from '@/stores/auth';
import { useRouter } from 'vue-router';

const auth = useAuth();
const router = useRouter();

function onLogout() {
  auth.logout();
  router.push({ name: 'home' });
}
</script>

<template>
  <ul class="navbar-nav">
    <template v-if="auth.isAuthenticated">
      <li>
        <RouterLink
          class="nav-link"
          :to="{ name: 'profile' }"
          data-test="profile"
        >
          Profile
        </RouterLink>
      </li>
      <li>
        <button
          class="nav-link me-2"
          data-test="logout"
          @click="onLogout"
        >
          Logout
        </button>
      </li>
    </template>
    <template v-else>
      <li>
        <RouterLink
          class="btn btn-primary me-2"
          :to="{ name: 'login' }"
          data-test="login"
        >
          Login
        </RouterLink>
      </li>
      <li>
        <RouterLink
          class="btn btn-light"
          :to="{ name: 'signup' }"
          data-test="signup"
        >
          Sign up
        </RouterLink>
      </li>
    </template>
  </ul>
</template>
