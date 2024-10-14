import { createWebHashHistory, createRouter } from "vue-router";

import Clients from "@/pages/Clients.vue";
import Sites from "@/pages/Sites.vue";
import SiteDetail from "@/pages/SiteDetail.vue";

const routes = [
  {
    path: "/",
    redirect: (to) => {
      return { path: "/clients" };
    },
  },
  { path: "/clients", name: "Clients", component: Clients },
  { path: "/sites", name: "Sites", component: Sites },
  { path: "/site/:id", name: "SiteDetail", component: SiteDetail },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: Clients },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === "Clients" && !to.query._page) {
    next({ ...to, query: { _page: 1, _limit: 6 } });
  } else if (to.name === "Sites" && !to.query._clientId && !to.query._page) {
    next({ ...to, query: { _page: 1, _limit: 18 } });
  } else {
    next();
  }
});

export default router;
