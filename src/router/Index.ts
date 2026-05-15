import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../Views/HomePage.vue'
import PostView from '../Views/PostView.vue'
import CreatePost from '../Views/CreatePost.vue'
import RouteName from "./Routes.ts";

const routes = [
    {
        path: '/',
        name: RouteName.HomePage,
        component: HomePage
    },
    {
        path: '/post/:id',
        name: RouteName.PostView,
        component: PostView
    },
    {
        path: '/create',
        name: RouteName.CreatePost,
        component: CreatePost
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
