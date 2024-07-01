import { ref } from 'vue'

export default function useCategories() {
    const categories = ref([])

    const getCategories = async () => {
        try{
            const response = await axios.get('/api/categories')
            categories.value = response.data.data
        }catch (error){
            console.log(error)
        }
    }

    return { categories, getCategories }
}
