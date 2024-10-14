<template>
  <DefaultLayout
    v-if="response && response.data[0]"
    :title="response.data[0].title"
  >
    <template #content>
      <div class="w-100 d-flex site__container">
        <div class="w-100 d-flex flex-column">
          <div
            v-if="loading"
            class="mx-auto spinner-border"
            role="status"
          ></div>

          <div v-if="error" class="text-danger font-weight-bold">
            {{ error }}
          </div>

          <div v-if="response">
            <div class="site__content" style="gap: 10px">
              <div class="card w-100">
                <div class="card-body site__info">
                  <img
                    :src="response.data[0].images[0]"
                    :alt="response.data[0].title"
                  />
                  <div class="mx-2">
                    <h5 class="card-title mb-3">About the site:</h5>
                    <h6 class="card-subtitle mb-4 text-muted">
                      {{ response.data[0].address.street }},
                      {{ response.data[0].address.city }},
                      {{ response.data[0].address.state }},
                      {{ response.data[0].address.country }},
                      {{ response.data[0].address.zipCode }}
                    </h6>
                    <h5 class="card-title mb-1">Tags:</h5>
                    <div class="site__tags">
                      <div
                        v-for="(tag, index) in response.data[0].tags"
                        :key="index"
                        class="tag"
                      >
                        {{ tag }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="card w-100">
                <div
                  class="card-body d-flex flex-column justify-content-center"
                >
                  <h5 class="card-title mb-3">About the main contact:</h5>
                  <h6 class="card-subtitle mb-3 text-muted">
                    {{ response.data[0].contacts.main.firstName }}&nbsp;{{
                      response.data[0].contacts.main.lastName
                    }}
                    - {{ response.data[0].contacts.main.jobTitle }}
                  </h6>
                  <h6 class="card-subtitle mb-3 text-muted">
                    {{ response.data[0].contacts.main.email }}
                  </h6>
                  <h6 class="card-subtitle mb-3 text-muted">
                    {{ response.data[0].contacts.main.phoneNumber }}
                  </h6>
                  <h6 class="card-subtitle mb-3 text-muted">
                    {{ response.data[0].contacts.main.address.street }},
                    {{ response.data[0].contacts.main.address.city }},
                    {{ response.data[0].contacts.main.address.state }},
                    {{ response.data[0].contacts.main.address.country }},
                    {{ response.data[0].contacts.main.address.zipCode }}
                  </h6>
                </div>
              </div>
            </div>
            <div class="mt-5 d-flex flex-column align-items-center">
              <h2>More pictures :</h2>
              <div
                class="mt-2 d-flex align-items-center justify-content-center flex-wrap"
                style="gap: 10px"
                v-if="response.data[0].images.length > 0"
              >
                <img
                  v-for="(image, index) in response.data[0].images"
                  :key="index"
                  class="w-100"
                  style="max-width: 350px"
                  :src="image"
                  :alt="response.data[0].title"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeMount, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useApi } from "@/composables/useApi";

import DefaultLayout from "@/layouts/DefaultLayout.vue";

const { response, error, loading, get } = useApi();

const route = useRoute();
const router = useRouter();

watch(
  () => route.params.id,
  () => {
    init();
  }
);

// Hooks
onBeforeMount(() => {
  init();
});

// Functions
const init = async (): Promise<any> => {
  await get("sites?id=" + route.params.id);

  if (
    response.value &&
    response.value.data &&
    response.value.data.length === 0
  ) {
    router.push({ name: "Sites" });
  }
};
</script>
