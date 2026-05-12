import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../Views/HomePage.vue'
import PostView from '../Views/PostView.vue'
import CreatePost from '../Views/CreatePost.vue'

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: '/post/:id',
        name: 'PostView',
        component: PostView
    },
    {
        path: '/create',
        name: 'CreatePost',
        component: CreatePost
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
