import {inject, reactive, ref} from 'vue'
import {useRouter} from "vue-router";
import { AbilityBuilder, Ability } from '@casl/ability';
import { ABILITY_TOKEN } from '@casl/vue'
const user = reactive({
    name: '',
    email: ''
});
export default function useAuth() {
    const processing = ref(false)
    const validationErrors = ref({})
    const router = useRouter()
    const swal = inject('$swal')
    const ability = inject(ABILITY_TOKEN)
    const loginForm = reactive({
        email: '',
        password: '',
        remember: false
    })
    const submitLogin = async () => {
        if (processing.value) return

        processing.value = true
        validationErrors.value = {}
        axios.post('/login', loginForm)
            .then(async response => {
                loginUser(response)
            })
            .catch(error => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors
                }
            })
            .finally(() => processing.value = false)
    }

    const loginUser = async (response) => {
        if (response.data && response.data.token) {
            localStorage.setItem('access_token', response.data.token);
            // Set Axios default header for authorization
            window.axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        }
        user.name = response.data.name;
        user.email = response.data.email;
        localStorage.setItem('loggedIn', JSON.stringify(true));
        await getAbilities();
        await router.push({ name: 'posts.index' });
    }


    // const loginUser = (response) => {
    //
    //     user.name = response.data.name
    //     user.email = response.data.email
    //     localStorage.setItem('loggedIn', JSON.stringify(true))
    //     if (response.data && response.data.token) {
    //         localStorage.setItem('access_token', response.data.token);
    //     }
    //     router.push({name: 'posts.index'})
    // }

    const getUser = () => {
        axios.get('/api/user')
            .then(response => {
                loginUser(response)
            })
    }

    const getAbilities = async => {
        axios.get('/api/abilities')
            .then(response => {
                const permissions = response.data
                const { can, rules } = new AbilityBuilder(Ability)

                can(permissions)

                console.log("get ability function has been called");
                console.log(permissions);

                ability.update(rules)
            })
    }

    const logout = async () => {
        if (processing.value) return

        processing.value = true

        axios.post('/logout')
            .then(response => {
                localStorage.removeItem('access_token');
                delete window.axios.defaults.headers.common['Authorization'];
                localStorage.setItem('loggedIn', JSON.stringify(false));
                router.push({ name: 'login' })
            })
            .catch(error => {
                swal({
                    icon: 'error',
                    title: error.response.status,
                    text: error.response.statusText
                })
            })
            .finally(() => {
                processing.value = false
            })
    }

    return {loginForm, processing, validationErrors, user, submitLogin, getUser, logout, getAbilities}
}
