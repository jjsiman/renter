<script setup lang="ts">
import axios from '@/services/axios';
import CardContainer from '@/components/CardContainer.vue';
import { ref } from 'vue';
import type { UserProfile } from '@/types/accounts';

const props = defineProps<{
  user: UserProfile;
}>();

const email = ref(props.user.email);

const currentPassword = ref('');
const currentPasswordInvalid = ref(false);

const newPassword = ref('');
const newPasswordInvalid = ref(false);

const repeatPassword = ref('');
const repeatPasswordInvalid = ref(false);

const saving = ref(false);
const success = ref(false);
const error = ref(false);

async function onSubmit() {
  currentPasswordInvalid.value = false;
  newPasswordInvalid.value = false;
  repeatPasswordInvalid.value = false;

  if (newPassword.value) {
    if (!currentPassword.value) {
      currentPasswordInvalid.value = true;
      return;
    }
    if (newPassword.value === currentPassword.value) {
      newPasswordInvalid.value = true;
      return;
    }
    if (newPassword.value !== repeatPassword.value) {
      repeatPasswordInvalid.value = true;
      return;
    }
  }

  saving.value = true;
  success.value = false;
  error.value = false;

  try {
    await axios.patch('accounts/profile/', {
      email: email.value,
      password: currentPassword.value,
      new_password: newPassword.value,
    });
    success.value = true;
  }
  catch {
    error.value = true;
  }

  saving.value = false;
  currentPassword.value = '';
  newPassword.value = '';
  repeatPassword.value = '';
}
</script>

<template>
    <form @submit.prevent="onSubmit">
        <h1 class="h3">Profile</h1>
        <CardContainer>
            <div class="card-body">
                <h2 class="h5">Settings</h2>
                <section role="group" aria-labelledby="settings" class="mb-4">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="email" v-model="email">
                </section>
                <h2 id="passwordSection" class="form-label h5">Change password</h2>
                <section role="group" aria-labeledby="passwordSection">
                    <div class="mb-3">
                        <label for="currentPassword" class="form-label">Current password</label>
                        <input type="password" class="form-control" id="currentPassword" v-model="currentPassword" :class="{ 'is-invalid': currentPasswordInvalid}" aria-describedby="currentPasswordInvalid">
                        <div id="currentPasswordInvalid" v-if="currentPasswordInvalid" class="invalid-feedback">The current password is required.</div>
                    </div>
                    <div class="mb-3">
                        <label for="newPassword" class="form-label">New password</label>
                        <input type="password" class="form-control" id="newPassword" v-model="newPassword" :class="{ 'is-invalid': newPasswordInvalid}" aria-describedby="newPasswordInvalid">
                        <div id="newPasswordInvalid" v-if="newPasswordInvalid" class="invalid-feedback">Password is the same as the current password.</div>
                    </div>
                    <div class="mb-3">
                        <label for="repeatPassword" class="form-label">Repeat new password</label>
                        <input type="password" class="form-control" id="repeatPassword" v-model="repeatPassword" :class="{ 'is-invalid': repeatPasswordInvalid}" aria-describedby="repeatPasswordInvalid">
                        <div id="repeatPasswordInvalid" v-if="repeatPasswordInvalid" class="invalid-feedback">Passwords do not match.</div>
                    </div>
                </section>
                <div class="d-flex justify-content-end align-items-center">
                    <div v-if="saving" class="text-info me-3" data-test="saving">
                        Saving...
                    </div>
                    <div v-if="success" class="text-success me-3" data-test="success">
                        <i class="bi bi-check-circle"></i> Saved
                    </div>
                    <div v-if="error" class="text-danger me-3" data-test="failed">
                        <i class="bi bi-exclamation-circle"></i> Failed
                    </div>
                    <button type="submit" class="btn btn-primary">Save</button>
                </div>
            </div>
        </CardContainer>
    </form>
</template>