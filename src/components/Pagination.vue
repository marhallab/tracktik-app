<template>
  <nav v-if="listPages.length > 0" class="d-flex justify-content-end mt-5 mx-2">
    <ul class="pagination">
      <li v-for="(page, index) in listPages" :key="index" class="page-item">
        <router-link
          v-if="isCurrent(page.url)"
          class="pagination__link -current"
          :to="{ path: route.path, query: parseUrl(page.url) }"
        >
          Current
        </router-link>

        <div v-else>
          <router-link
            class="pagination__link"
            :to="{ path: $route.path, query: parseUrl(page.url) }"
          >
            {{ page.rel }}
          </router-link>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";

const route = useRoute();

const props = defineProps({
  listPages: {
    type: Array<any>,
    default: null,
    required: true,
  },
});

const parseUrl = (queryString: string): object => {
  return queryString
    .substring(1)
    .split("&")
    .reduce((acc, param) => {
      const [key, value] = param.split("=");
      acc[decodeURIComponent(key)] = decodeURIComponent(value || "");
      return acc;
    }, {});
};

const isCurrent = (queryString: string): boolean => {
  const obj: { _page?: string } = parseUrl(queryString);
  return route.query._page === obj._page;
};
</script>
