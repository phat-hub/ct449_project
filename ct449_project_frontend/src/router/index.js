import { createWebHistory, createRouter } from "vue-router";
import Book from "@/views/Book.vue";
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
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/books/add", // Route cho trang thêm mới liên hệ
        name: "book.add",
        component: () => import("@/views/BookAdd.vue"),
    },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;