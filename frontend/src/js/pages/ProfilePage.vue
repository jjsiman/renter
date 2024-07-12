<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from '@/services/axios';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import ProfileForm from '@/components/ProfileForm.vue';

interface User {
  email: string;
}

const user = ref<User>();
const loading = ref(false);
const error = ref('');

onMounted(() => {
  fetchCurrentUser();
});

async function fetchCurrentUser() {
  loading.value = true;
  error.value = '';

  try {
    const resp = await axios.get<User>('accounts/profile/');
    user.value = resp.data;
  }
  catch {
    error.value = 'Could not fetch your profile. Please reload the page to try again.';
  }
  finally {
    loading.value = false;
  }
}
</script>

<template>
  <DefaultLayout :show-footer="true">
    <div class="container-xxl py-5">
      <div class="row">
        <div class="col-10 col-sm-6 offset-1 offset-sm-3">
          <ProfileForm
            v-if="user"
            :user="user"
          />
          <div
            v-else-if="error"
            data-test="error"
          >
            {{ error }}
          </div>
          <div
            v-else-if="loading"
            data-test="loading"
          >
            Loading profile...
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<style lang="scss"></style>
