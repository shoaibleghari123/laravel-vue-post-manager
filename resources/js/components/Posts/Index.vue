<template>


    <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                   ID
                </th>
                <th scope="col" class="px-6 py-3">
                    Post
                </th>
                <th scope="col" class="px-6 py-3">
                    Category
                </th>
                <th scope="col" class="px-6 py-3">
                    Content
                </th>
                <th scope="col" class="px-6 py-3">
                    Created At
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="post in posts">
                <td class="px-6 py-4">
                    {{ post.id }}
                </td>
                <td class="px-6 py-4">
                    {{ post.title }}
                </td>
                <td class="px-6 py-4">
                    {{ post.category }}
                </td>
                <td class="px-6 py-4">
                    {{ post.content }}
                </td>
                <td class="px-6 py-4">
                    {{ post.created_at }}
                </td>
            </tr>

            </tbody>
        </table>
    </div>

</template>

<script>
// import { TailwindPagination } from 'laravel-vue-pagination';
export default {
    data() {
        return {
            posts:[]
        }
    },
    mounted() {
        this.fetchPosts();
    },
    methods: {
        fetchPosts() {
            axios.get('/api/posts')
                .then(response => this.posts = response.data.data)
                .catch(error => console.log(error))
        }
    }
}
</script>
