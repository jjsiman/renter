<script setup lang="ts">
import { computed, ref } from 'vue';
import axios from '@/services/axios';
import CardContainer from '@/components/CardContainer.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import { isAxiosError } from 'axios';
import type { SignupError } from '@/types/accounts';
import { useAuth } from '@/stores/auth';
import { useRouter } from 'vue-router';

const auth = useAuth();
const router = useRouter();

const signupErrors = ref<SignupError>({});

const email = ref('');
const emailInvalid = computed(() => signupErrors.value['email'] || []);

const password = ref('');
const passwordInvalid = computed(() => signupErrors.value['password'] || []);
const repeatPassword = ref('');
const repeatPasswordInvalid = ref('');

const loginError = ref(false);

async function onSubmit() {
  loginError.value = false;
  signupErrors.value = {
    email: [],
    password: []
  };

  if (repeatPassword.value !== password.value) {
    repeatPasswordInvalid.value = 'Passwords must match.';
    return;
  }
  try {
    await axios.post('accounts/register/', {
      email: email.value,
      password: password.value,
    });

    try {
      await auth.login(email.value, password.value);
      router.push({ name: 'home' });
    }
    catch {
      loginError.value = true;
    }
  }
  catch (error) {
    if (isAxiosError<SignupError>(error) && error.response) {
      signupErrors.value = error.response.data;
    }
  }
}
</script>

<template>
  <DefaultLayout>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-auto p-5">
          <CardContainer>
            <div v-if="loginError" class="card-body text-center" data-test="loginError">
              <p>Your account was created but we are unable to log you in at this time. Please try to
                login again.</p>
              <RouterLink class="btn btn-primary" :to="{ name: 'login' }">Login</RouterLink>
            </div>
            <form v-else class="card-body" @submit.prevent="onSubmit">
              <h2 class="h4">Sign up for Renter</h2>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input v-model="email" type="email" name="email" class="form-control"
                  :class="{ 'is-invalid': emailInvalid.length }" id="email"
                  :aria-describedby="emailInvalid.length ? 'emailValidationFeedback' : undefined" required>
                <div v-if="emailInvalid.length" id="emailValidationFeedback" class="invalid-feedback">
                  <span v-for="message in emailInvalid" :key="message">{{ message }}</span>
                </div>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input v-model="password" type="password" name="password" class="form-control" id="password"
                  :class="{ 'is-invalid': passwordInvalid.length }"
                  :aria-describedby="passwordInvalid.length ? 'passwordValidationFeedback' : undefined" required>
                <div v-if="passwordInvalid.length" id="passwordValidationFeedback" class="invalid-feedback">
                  <span v-for="message in passwordInvalid" :key="message">{{ message }}</span>
                </div>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Repeat password</label>
                <input v-model="repeatPassword" type="password" name="repeatPassword" class="form-control"
                  id="repeatPassword"
                  :aria-describedby="repeatPasswordInvalid ? 'repeatPasswordValidationFeedback' : undefined" required>
                <div v-if="repeatPasswordInvalid" id="repeatPasswordValidationFeedback" class="invalid-feedback">
                  {{ repeatPasswordInvalid }}
                </div>
              </div>
              <button type="submit" class="btn btn-primary" data-test="submit">Sign up</button>
            </form>
          </CardContainer>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>
