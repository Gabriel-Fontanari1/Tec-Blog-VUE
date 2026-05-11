import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePostStore = defineStore('post', () => {
    // Array vazio
    const dataCards = ref<any[]>([])
    const loading = ref(false)

    // Buscar os dados da api
    const getPosts = async () => {
        loading.value = true
        try {
            const response = await fetch('https://dummyjson.com/posts')
            const data = await response.json()

            // A API retorna um objeto. O array de posts está dentro da chave .posts
            // Puxa os 16 primeiros valores / 16 valores por pagina
            dataCards.value = data.posts.slice(0, 16)
        } catch (error) {
            console.error("Erro ao buscar posts:", error)
        } finally {
            loading.value = false
        }
    }

    return { dataCards, loading, getPosts }
})