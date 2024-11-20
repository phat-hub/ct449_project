import { createWebHistory, createRouter } from "vue-router";
import Book from "@/views/Book.vue";
import { isAuthenticated } from "@/utils/auth"; // Hàm kiểm tra token

const routes = [
    {
        path: "/register",
        name: "register",
        component: () => import("@/views/Register.vue"),
    },
    {
        path: "/",
        name: "login",
        component: () => import("@/views/Login.vue"),
    },
    {
        path: "/books",
        name: "book",
        component: Book,
        meta: { requiresAuth: true }, // Yêu cầu đăng nhập
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
    {
        path: "/books/:id",
        name: "book.edit",
        component: () => import("@/views/BookEdit.vue"),
        props: true,
        meta: { requiresAuth: true }, // Yêu cầu đăng nhập
    },
    {
        path: "/books/add",
        name: "book.add",
        component: () => import("@/views/BookAdd.vue"),
        meta: { requiresAuth: true }, // Yêu cầu đăng nhập
    },
    {
        path: "/publishers",
        name: "publisher",
        component: () => import("@/views/Publisher.vue"),
        meta: { requiresAuth: true }, // Yêu cầu đăng nhập
    },
    {
        path: "/publishers/:id",
        name: "publisher.edit",
        component: () => import("@/views/PublisherEdit.vue"),
        props: true,
        meta: { requiresAuth: true }, // Yêu cầu đăng nhập
    },
    {
        path: "/publishers/add",
        name: "publisher.add",
        component: () => import("@/views/PublisherAdd.vue"),
        meta: { requiresAuth: true }, // Yêu cầu đăng nhập
    },
    {
        path: "/readers",
        name: "reader",
        component: () => import("@/views/Reader.vue"),
        meta: { requiresAuth: true }, // Yêu cầu đăng nhập
    },
    {
        path: "/readers/:id",
        name: "reader.edit",
        component: () => import("@/views/ReaderEdit.vue"),
        props: true,
        meta: { requiresAuth: true }, // Yêu cầu đăng nhập
    },
    {
        path: "/readers/add",
        name: "reader.add",
        component: () => import("@/views/ReaderAdd.vue"),
        meta: { requiresAuth: true }, // Yêu cầu đăng nhập
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

// Middleware kiểm tra xác thực
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !isAuthenticated()) {
        // Nếu chưa đăng nhập, chuyển hướng về trang login
        return next({ name: "login" });
    }
    next(); // Tiếp tục điều hướng nếu đã đăng nhập hoặc không yêu cầu xác thực
});

export default router;
