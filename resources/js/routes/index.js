import {createRouter, createWebHistory} from "vue-router";

import AuthenticatedLayout from "../layouts/Authenticated";
import GuestLayout from "../layouts/Guest";

import postIndex from '../components/Posts/post-list'
import PostCreate from '../components/Posts/create'
import PostEdit from '../components/Posts/Edit'
import Login from "../components/Login"

function auth(to, from, next) {
    if (JSON.parse(localStorage.getItem('loggedIn'))) {
        next()
    }

    next('/login')
}

const routes = [
    {
        path: '/',
        redirect: {name: 'login'},
        component: GuestLayout,
        children: [
            {
                path: '/login',
                name: 'login',
                component: Login
            }
        ]
    },
    {
        component: AuthenticatedLayout,
        beforeEnter: auth,
        children: [
            {
                path: '/posts',
                name: 'posts.index',
                component: postIndex,
                meta: {title: 'Posts'}
            },
            {
                path: '/posts/create',
                name: 'posts.create',
                component: PostCreate,
                meta: {title: 'Add New Post'}
            },
            {
                path: '/posts/edit/:id',
                name: 'posts.edit',
                component: PostEdit,
                meta: {title: 'Edit Post'}
            }
        ]
    }

]

export default createRouter({
    history: createWebHistory(),
    routes
})
