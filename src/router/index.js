import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import { useLoader } from "@/composables/useLoader";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 };
        }
    },
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/catalog",
            name: "catalog",
            component: () => import("@/views/CatalogView.vue"),
        },
        {
            path: "/cart",
            name: "cart",
            component: () => import("@/views/CartView.vue"),
        },
        {
            path: "/product/:id",
            name: "product",
            component: () => import("@/views/ProductView.vue"),
        },
        {
            path: "/about",
            name: "about",
            component: () => import("@/views/AboutView.vue"),
        },
        {
            path: "/contacts",
            name: "contacts",
            component: () => import("@/views/ContactsView.vue"),
        },
        {
            path: "/:pathMatch(.*)*",
            name: "not-found",
            component: () => import("@/views/NotFoundView.vue"),
        },
    ],
});

router.beforeEach((to, from, next) => {
    const { showLoader } = useLoader();
    showLoader();
    next();
});

router.afterEach(() => {
    const { hideLoader } = useLoader();
    setTimeout(() => {
        hideLoader();
    }, 400);
});

export default router;
