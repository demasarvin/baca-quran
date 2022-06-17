import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "list",
    component: () => import("../views/List.vue"),
  },
  {
    path: "/surah/:id",
    name: "surah",
    component: () => import("../views/Surah.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
