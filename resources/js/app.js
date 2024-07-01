require('./bootstrap');

import {createApp, onMounted} from "vue";
import { TailwindPagination } from 'laravel-vue-pagination';
import router from './routes/index'
import VueSweetalert2 from 'vue-sweetalert2';
import useAuth from "./composable/auth";

const app = createApp({
    setup() {
        const { getUser } = useAuth()
        onMounted(getUser)
    }
})
app.use(router)
app.use(VueSweetalert2);

app.component('TailwindPagination', TailwindPagination)
app.mount("#app")
