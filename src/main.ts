import { createApp } from "vue";
import "@/scss/main.scss";
import router from "@/router.ts";
import App from "./App.vue";

createApp(App).use(router).mount("#app");
