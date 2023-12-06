import { useUserStore } from "@/stores/user";
import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "landing",
      component: () => import("@/views/public/landing_view/LandingView.vue")
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("@/views/public/signup_view/SignUpView.vue")
    },
    {
      path: "/home",
      name: "home",
      component: () => import("@/views/private/home_view/HomeView.vue")
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("@/views/shared/not_found_view/NotFoundView.vue")
    }
  ]
});

router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/", "/signup"];
  const authRequired = !publicPages.includes(to.path);
  const userStore = useUserStore();

  if (authRequired && !userStore.user) {
    return "/signup";
  }
});
