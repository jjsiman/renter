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
    <button v-if="auth.isAuthenticated" class="btn btn-primary me-2" @click="onLogout" data-test="logout">
        Logout
    </button>
    <template v-else>
        <RouterLink class="btn btn-primary me-2" :to="{ name: 'login' }" data-test="login">
            Login
        </RouterLink>
        <a class="btn btn-light" href="#">Sign Up</a>
    </template>
</template>
