<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import DefaultLayout from '@/layouts/DefaultLayout.vue';
import CardContainer from '@/components/CardContainer.vue';

import { useAuth } from '@/stores/auth';

const { login } = useAuth();
const router = useRouter();

const error = ref('');

const email = ref('');
const password = ref('');

async function onLogin() {
  error.value = '';
  try {
    await login(email.value, password.value);
    router.push({ name: 'home' });
  }
  catch {
    error.value = 'Invalid login. Please try again.';
  }
}
</script>

<template>
  <DefaultLayout>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-auto p-5">
          <CardContainer>
            <form class="card-body" @submit.prevent="onLogin">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input v-model="email" type="email" name="email" class="form-control" :class="{ 'is-invalid': error }" id="email"
                  :aria-describedby="error ? 'validationFeedback' : undefined" required>
                <div v-if="error" id="validationFeedback" class="invalid-feedback">
                  {{ error }}
                </div>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input v-model="password" type="password" name="password" class="form-control" id="password"
                  :aria-describedby="error ? 'validationFeedback' : undefined" required>
              </div>
              <button type="submit" class="btn btn-primary" data-test="submit">Login</button>
            </form>
          </CardContainer>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>
