import { createRouter, createWebHistory } from "vue-router";
import IndexView from "../views/IndexView.vue";

const routes = [
  {
    path: "/",
    name: "Index",
    component: IndexView,
    children: [
      {
        path: "blog/:type",
        name: "HomePage",
        component: () => import("@/views/blog/home/HomePageView"),
        props: true,
      },
      {
        path: "blog/:type/:id",
        name: "BlogContent",
        component: () => import("@/views/blog/content/BlogContentView"),
      },
      {
        path: "tag",
        name: "TagPage",
        component: () => import("@/views/tag/TagView"),
      },
      {
        path: "about",
        name: "AboutPage",
        component: () => import("@/views/about/AboutView"),
      },
      {
        path: "project",
        name: "ProjectPage",
        component: () => import("@/views/project/ProjectView"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name == "Index") {
    next({ path: "blog/home" });
  }
  if (to.path == "blog/blog") {
    next({ path: "blog/home" });
  }
  next();
});

export default router;
