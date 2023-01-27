import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/IndexView.vue'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: HomeView,
    children: [
      {
        path: 'Home/:type?',
        name: 'HomePage',
        component: () => import("@/views/home/HomePageView"),
      },
      {
        path: 'Home/:type/:id',
        name: 'BlogContent',
        component: () => import("@/views/blog/BlogContentView")
      },
      {
        path: 'About',
        name: 'AboutPage',
        component: () => import("@/views/about/AboutView")
      },
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach( (to, from, next) => {
  if (to.name == 'Index') {
    next({name: 'HomePage'})
  }
  next();
});

export default router
