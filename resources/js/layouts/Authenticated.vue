<template>
    <div class="min-h-screen bg-gray-100">
        <nav class="bg-white border-b border-gray-100">
            <div class="max-w-7xl mx-auto px-4 sm:px-100 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex">
                        <div class="shrink-0 flex items-center">
                            <a href="/">
                                <svg viewBox="0 0 316 316" xmlns="http://www.w3.org/2000/svg" class="flex">
                                    <path></path>
                                </svg>
                            </a>
                        </div>

                        <div class="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                            <router-link :to="{ name: 'posts.index' }" active-class="border-b-2 border-indigo-400"
                                         class="inline-flex items-center px-1">
                                Posts
                            </router-link>
                            <router-link :to="{ name: 'posts.create' }" active-class="border-b-2 border-indigo-400"
                                         class="inline-flex items-center px-1">
                                Create Post
                            </router-link>
                        </div>
                    </div>

                    <div class="flex items-center">
                        <div>
                            <div>Hi, {{ user.name }}</div>
                            <div class="text-sm text-gray-500">{{ user.email }}</div>
                        </div>
                    </div>
                    <button @click="logout" type="button" class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray transition ease-in-out duration-150 ml-4" :class="{ 'opacity-25': processing }" :disabled="processing">
                        Log out
                    </button>

                </div>
            </div>
        </nav>


        <header class="bg-white shadow">
            <div class="max-w-7xl mx-auto px-4 sm:px-100 lg:px-8">
                <h2 class="font-semibold text-xl text-gray-800 loading-tonight">
                    {{ currentPageTitle }}
                </h2>
            </div>
        </header>

        <main>
            <div class="py-12">
                <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div class="py-6 bg-white border-b border-gray-200">
                            <router-view></router-view>
                        </div>
                    </div>
                </div>
            </div>
        </main>

    </div>
</template>
<script>
import useAuth from "../composable/auth";

export default {
    setup() {
        const { user, processing, logout } = useAuth()

        return { user, processing, logout }
    },

    computed: {
        currentPageTitle() {
            return this.$route.meta.title
        }
    }
}
</script>
