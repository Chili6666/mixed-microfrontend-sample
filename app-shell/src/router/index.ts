// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { ReactRemoteWrapper } from '../components/ReactRemoteWrapper'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/mfe1",
      name: "MFE1",
      component: () => import("mfe1/App"),
    },
    {
      path: "/mfe2",
      name: "MFE2",
      component: () => import("mfe2/App"),
    },
    {
      path: "/mfe3",
      name: "MFE3",
      //component: () => import("mfe3/remote-app"),
      component: ReactRemoteWrapper,
    },
  ],
});

export default router;
