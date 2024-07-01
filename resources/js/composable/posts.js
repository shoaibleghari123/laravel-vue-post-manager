import { ref, inject } from 'vue'
import { useRouter } from "vue-router";

export default function usePosts() {
    const posts = ref({})
    const router = useRouter()
    const validationErrors = ref({})
    const isLoading = ref(false)
    const post = ref({})
    const swal = inject('$swal')
    const getPosts = async (
        page = 1,
        category='',
        search_id='',
        search_title='',
        search_content='',
        search_global='',
    ) => {
        axios.get('/api/posts?page='
            + page +
            '&search_category=' + category+
            '&search_id=' + search_id+
            '&search_title=' + search_title+
            '&search_content=' + search_content+
            '&search_global=' + search_global
        )
            .then(response => posts.value = response.data)
            .catch(error => console.log(error))
    }

    const storePost = async (post) => {
        if (isLoading.value) return

        isLoading.value = true
        validationErrors.value = {}

        let serializedPost = new FormData()
        for (let item in post) {
            if (post.hasOwnProperty(item)) {
                serializedPost.append(item, post[item])
            }
        }

        axios.post('/api/posts',serializedPost)
            .then( response => {
                router.push({name: 'posts.index'})
        })
            .catch(error => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors
                }
            })
            .finally( () => isLoading.value = false)
    }

    const getPost = async (id) => {
        axios.get('/api/posts/' + id)
            .then(response => {
                post.value = response.data.data
            })
            .catch(error => {
                console.log(error)
            })
    }

    const updatePost = async (post) => {
        if (isLoading.value) return

        isLoading.value = true
        validationErrors.value = {}

        axios.put('/api/posts/' + post.id ,post)
            .then( response => {
                router.push({name: 'posts.index'})
                swal({
                    icon: 'success',
                    title: 'post update successfully'
                })
            })
            .catch(error => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors
                }
            })
            .finally( () => isLoading.value = false)
    }

    const deletePost = async (id) => {
        swal({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this action!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            confirmButtonColor: '#ef4444',
            timer: 20000,
            timerProgressBar: true,
            reverseButtons: true
        })
            .then(result => {
                if (result.isConfirmed) {
                    axios.delete('/api/posts/' + id)
                        .then(response => {
                            getPosts()
                            router.push({name: 'posts.index'})
                            swal({
                                icon: 'success',
                                title: 'post delete successfully'
                            })
                        })
                        .catch(error => {
                            swal({
                                icon: 'error',
                                title: 'Something went wrong'
                            })
                        })
                }
            })
    }



    return {
        posts,
        post,
        getPost,
        getPosts,
        storePost,
        updatePost,
        deletePost,
        validationErrors,
        isLoading
    }
}

