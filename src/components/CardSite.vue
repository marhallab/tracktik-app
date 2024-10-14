<template>
  <div class="site__card">
    <img :src="image" :alt="title" />
    <div class="w-100">
      <h3 class="mt-3 mb-2">{{ title }}</h3>
      <div class="d-flex flex-wrap">
        <div v-for="(tag, index) in tags" :key="index" class="tag">
          {{ tag }}
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    default: "Lorem Ipsum",
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  tags: {
    type: Array<any>,
    required: true,
  },
});
</script>
