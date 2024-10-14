<template>
  <DefaultLayout :subtitle="subtitle" :title="title" :description="description">
    <template #content>
      <div class="w-100 d-flex client__container">
        <Filter>
          <template #content>
            <div>
              <h3
                class="font-weight-bold text-uppercase text-decoration-underline"
              >
                Sort by :
              </h3>
              <select
                class="form-select mb-4"
                aria-label="Default select"
                v-model="sortPriority"
              >
                <option value="createdAt">Creation date</option>
                <option value="updatedAt">Update date</option>
              </select>
            </div>

            <div v-if="sortPriority">
              <h3
                class="font-weight-bold text-uppercase text-decoration-underline"
              >
                Order by:
              </h3>
              <select
                class="form-select mb-4"
                aria-label="Default select"
                v-model="orderPriority"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
            <div v-if="tags.length > 0" class="mb-4">
              <h3
                class="font-weight-bold text-uppercase text-decoration-underline"
              >
                By tags:
              </h3>
              <div class="d-flex flex-wrap">
                <div
                  v-for="(tag, index) in tags"
                  :key="index"
                  @click="toggleTag(tag)"
                  class="tag"
                  :class="{ ' -active': isTagActive(tag) }"
                >
                  {{ tag }}
                </div>
              </div>
            </div>
            <div class="link" @click="reset()">Reset filters</div>
          </template>
        </Filter>
        <div class="w-100 d-flex flex-column align-items-center">
          <div
            v-if="loading"
            class="mx-auto spinner-border"
            role="status"
          ></div>

          <div v-if="error" class="text-danger font-weight-bold">
            {{ error }}
          </div>

          <div v-if="response" class="client__list">
            <div v-if="filteredList.length === 0" class="font-weight-bold">
              No elements available
            </div>
            <CardClient
              v-for="item in filteredList"
              :key="item.id"
              :title="item.givenName"
              :image="item.logo"
              :tags="item.tags"
              @click="sitesClient(item.id)"
            />
          </div>
          <Pagination class="align-self-end" :listPages="navigationObjects" />
        </div>
      </div>
    </template>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeMount, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useApi } from "@/composables/useApi";
import { useParseLinkHeader } from "@/composables/useParseLinkHeader";

import DefaultLayout from "@/layouts/DefaultLayout.vue";

import Filter from "@/components/Filter.vue";
import CardClient from "@/components/CardClient.vue";
import Pagination from "@/components/Pagination.vue";

const { response, error, loading, get } = useApi();
const { navigationObjects, parseLinks } = useParseLinkHeader();

const route = useRoute();
const router = useRouter();

const title = "List of all the clients";
const subtitle = "display all clients";
const description =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce elit libero, maximus condimentum nisi molestie, ullamcorper tempor ex. Nam porttitor nisi non ultrices egestas. Nunc et arcu velit. ";

const tags = ref<Array<any>>([]);
const activeTags = ref<Array<any>>([]);
const orderPriority = ref<string>("asc");
const sortPriority = ref<string>(null);

// Hooks
onBeforeMount(() => {
  init();
});

// Watchers
watch(
  () => route.query,
  () => {
    init();
  }
);

watch(
  () => orderPriority.value,
  () => {
    if (sortPriority.value) addQueryFilter("_order", orderPriority.value);
  }
);

watch(
  () => sortPriority.value,
  () => {
    addQueryFilter("_sort", sortPriority.value);
  }
);

// Computed
const filteredList = computed(() => {
  const list: Array<any> = response.value.data || [];

  if (activeTags.value.length > 0) {
    return list.filter((element) => {
      return (
        element.tags.length > 0 &&
        activeTags.value.some((tag) => element.tags.includes(tag))
      );
    });
  }
  return list;
});

// Functions
const init = async (): Promise<any> => {
  let queryString = "";
  let isFirst = true;

  for (const [key, value] of Object.entries(route.query)) {
    if (value !== null && value !== undefined) {
      if (isFirst) {
        queryString += `?${key}=${value}`;
        isFirst = false;
      } else {
        queryString += `&${key}=${value}`;
      }
    }
  }

  await get("clients" + queryString);

  getHeadersLink();

  getTags();

  initPriority();
};

const getHeadersLink = (): void => {
  if (response.value.headers.link) {
    parseLinks(response.value.headers.link);
  }
};

const getTags = (): void => {
  tags.value = [];
  activeTags.value = [];
  if (response.value.data) {
    response.value.data.forEach((element: { tags: string[] }) => {
      if (element.tags.length > 0) {
        element.tags.forEach((item: string) => {
          if (tags.value.length === 0) {
            tags.value.push(item);
          } else if (!tags.value.includes(item)) {
            tags.value.push(item);
          }
        });
      }
    });
  }
};

const initPriority = (): void => {
  orderPriority.value = Array.isArray(route.query._order)
    ? route.query._order[0]
    : route.query._order || "asc";
  sortPriority.value = Array.isArray(route.query._sort)
    ? route.query._sort[0]
    : route.query._sort || null;
};

const addTag = (tag: string): void => {
  activeTags.value.push(tag);
};

const isTagActive = (tag: string): boolean => {
  return activeTags.value.includes(tag);
};

const removeTag = (tag: string): void => {
  const index = activeTags.value.indexOf(tag);
  activeTags.value.splice(index, 1);
};

const toggleTag = (tag: string) => {
  if (isTagActive(tag)) {
    removeTag(tag);
  } else {
    addTag(tag);
  }
};

const addQueryFilter = (key: string, value: string | number): void => {
  const newQuery = { ...route.query, [key]: value };
  router.push({ path: route.path, query: newQuery });
};

const sitesClient = (value: string): void => {
  const newQuery = { _expand: "client", _clientId: value };
  router.push({ name: "Sites", query: newQuery });
};

const reset = (): void => {
  activeTags.value = [];
  router.push({ name: "Clients" });
};
</script>
