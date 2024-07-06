<template>

    <div class="overflow-hidden overflow-x-auto p-6 bg-white border-gray-200">
        <div class="min-w-full align-middle">
        <div class="mb-4 grid lg:grid-cols-4 gap-4">
            <input v-model="search_global" type="text" placeholder="Search..." class="inline-block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        </div>
        <table class="min-w-full divide-y divide-gray-200 border">
            <thead>
            <tr>
                <th class="px-6 py-3 bg-gray-50 text-left">
                    <input v-model="search_id" type="text" class="inline-block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Filter by ID">
                </th>
                <th class="px-6 py-3 bg-gray-50 text-left">
                    <input v-model="search_title" type="text" class="inline-block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Filter by Title">
                </th>
                <th class="px-6 py-3 bg-gray-50 text-left">
                    <select v-model="search_category" class="inline-block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                        <option value="" selected>-- all categories --</option>
                        <option v-for="category in categories" :value="category.id">
                            {{ category.name }}
                        </option>
                    </select>
                </th>
                <th class="px-6 py-3 bg-gray-50 text-left">
                    <input v-model="search_content" type="text" class="inline-block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Filter by Content">
                </th>
                <th class="px-6 py-3 bg-gray-50 text-left"></th>
                <th class="px-6 py-3 bg-gray-50 text-left"></th>
            </tr>
            <tr>
                <th class="px-6 py-3 bg-gray-50 text-left">
                    <!--                        <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">ID</span>-->
                    <div class="flex flex-row items-center justify-between cursor-pointer" >
                        <div class="leading-4 font-medium text-gray-500 uppercase tracking-wider" >
                            ID
                        </div>

                    </div>
                </th>
                <th class="px-6 py-3 bg-gray-50 text-left">
                    <!--                        <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Title</span>-->
                    <div class="flex flex-row items-center justify-between cursor-pointer" >
                        <div class="leading-4 font-medium text-gray-500 uppercase tracking-wider" >
                            Title
                        </div>

                    </div>
                </th>
                <th class="px-6 py-3 bg-gray-50 text-left">
                    <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Category</span>
                </th>
                <th class="px-6 py-3 bg-gray-50 text-left">
                    <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Content</span>
                </th>
                <th class="px-6 py-3 bg-gray-50 text-left">
                    <!--                        <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Created at</span>-->
                    <div class="flex flex-row items-center justify-between cursor-pointer" >
                        <div class="leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            Created at
                        </div>

                    </div>
                </th>
                <th class="px-6 py-3 bg-gray-50 text-left">
                    Actions
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="post in posts.data">
                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                    {{ post.id }}
                </td>
                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                    {{ post.title }}
                </td>
                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                    {{ post.category }}
                </td>
                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                    {{ post.content }}
                </td>
                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                    {{ post.created_at }}
                </td>


                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                    <router-link v-if="can('posts.update')" :to="{ name: 'posts.edit', params: { id: post.id } }">Edit</router-link>
                    <a href="#" @click.prevent="deletePost(post.id)" class="ml-2">Delete</a>
                </td>
            </tr>
            </tbody>
        </table>
        <TailwindPagination :data="posts" @pagination-change-page="page => getPosts(page, selectedCategory)"/>
        </div>
    </div>

</template>
<script>
import {onMounted, ref, watch} from "vue";
import usePosts from '../../composable/posts'
import useCategories from '../../composable/categories'
import { useAbility } from "@casl/vue";

export default {
    setup() {
        const search_category = ref('')
        const search_id = ref('')
        const search_title = ref('')
        const search_content = ref('')
        const search_global = ref('')
        const { posts, getPosts, deletePost } = usePosts()
        const { categories, getCategories } = useCategories()
        const { can } = useAbility()
        watch(search_category, (current, previous) => {
            getPosts(1, current, search_id.value, search_title.value, search_content.value, search_global.value)
        })

        watch(search_id, (current, previous) => {
            getPosts(1, search_category.value, current, search_title.value, search_content.value, search_global.value)
        })

        watch(search_title, (current, previous) => {
            getPosts(1, search_category.value, search_id.value, current, search_content.value, search_global.value)
        })

        watch(search_content, (current, previous) => {
            getPosts(1, search_category.value, search_id.value, search_title.value, current, search_global.value)
        })

        watch(search_global, (current, previous) => {
            getPosts(1, search_category.value, search_id.value, search_title.value, search_content.value, current)
        })


        onMounted( () => {
            getPosts()
            getCategories()
        })

        return {
            posts,
            getPosts,
            deletePost,
            categories,
            search_category,
            search_id,
            search_title,
            search_content,
            search_global,
            can
        }
    }
}
</script>
