import { createRouter, createWebHistory } from "vue-router";
import IndexView from "../views/IndexView.vue";

const routes = [
  {
    path: "/",
    name: "Index",
    component: IndexView,
    children: [
      {
        path: "Blog/:type",
        name: "HomePage",
        component: () => import("@/views/blog/home/HomePageView"),
        props: true,
      },
      {
        path: "Blog/:type/:id",
        name: "BlogContent",
        component: () => import("@/views/blog/content/BlogContentView"),
      },
      {
        path: "Tag",
        name: "TagPage",
        component: () => import("@/views/tag/TagView"),
        // children: [
        //   {
        //     path: 'search',
        //     name: 'TagSearch',
        //     component: () => import("@/components/blog/tag/TagSearchView")
        //   },
        // ]
      },
      {
        path: "About",
        name: "AboutPage",
        component: () => import("@/views/about/AboutView"),
      },
      {
        path: "Project",
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
    next({ path: "Blog/home" });
  }
  if (to.path == "Blog/Blog") {
    next({ path: "Blog/home" });
  }
  next();
});

export default router;
