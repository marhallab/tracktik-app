<template>
  <div class="client__card">
    <img
      class="rounded-circle"
      :src="image"
      :alt="title"
      width="75"
      height="75"
    />
    <div class="w-100">
      <h3 class="mb-2">{{ title }}</h3>
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
