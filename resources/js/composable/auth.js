import {reactive, ref} from 'vue'
import { useRouter } from "vue-router";

const user = reactive({
    name: '',
    email: ''
});
export default function useAuth() {
    const processing = ref(false)
    const validationErrors = ref({})
    const router = useRouter()
    const loginForm = reactive({
        email: '',
        password: '',
        remember: false
    })
    const submitLogin = async () => {
        if(processing.value) return

        processing.value = true
        validationErrors.value = {}
        axios.post('/login', loginForm)
            .then( async response => {
                loginUser(response)
            })
            .catch(error => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors
                }
            })
            .finally( ()=> processing.value = false)
    }

    const loginUser = (response) => {
        user.name = response.data.name
        user.email = response.data.email
        localStorage.setItem('loggedIn', JSON.stringify(true))
        router.push({ name: 'posts.index' })
    }

    const getUser = () => {
        axios.get('/api/user')
            .then(response => {
                loginUser(response)
            })
    }

    return { loginForm, processing, validationErrors, user, submitLogin, getUser }
}
