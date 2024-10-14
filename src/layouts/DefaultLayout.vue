<template>
  <div>
    <Navbar />
    <div class="layout__container">
      <div class="mt-5 layout__header">
        <h2 v-html="subtitle"></h2>
        <h1 v-html="title"></h1>
        <p v-html="description"></p>
      </div>
      <div class="mt-5">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Navbar from "@/components/Navbar.vue";

const props = defineProps({
  title: {
    type: String,
    default: "Lorem Ipsum",
    required: true,
  },
  subtitle: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
});
</script>
