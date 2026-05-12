import { defineStore } from 'pinia'
import {computed, ref} from 'vue'

export const usePostStore = defineStore('post', () => {
    const dataCards = ref<any[]>([])
    const loading = ref(false)
    const featuredCards = computed(() => {
        return [...dataCards.value]
            .sort((a, b) => b.reactions.likes - a.reactions.likes)
            .slice(0, 4)
    })
    
    
    const getPosts = async () => {
        loading.value = true
        try {
            const response = await fetch('https://dummyjson.com/posts')
            const data = await response.json()
            
            // Percorre os posts para adiconar uma propriedade imagem
            // data.post é o array real de 30 objs
            dataCards.value = data.posts.slice(0, 16).map((post: any) => {
                // Any -> typescript verifica os tipos, any indica que nao vai ser informado a tipagem ainda
                return {
                    ...post,
                    // Id para gerar 1 imagem unica para cada
                    // Largura de 400 por 250
                    image: `https://picsum.photos/seed/${post.id}/400/250`
                }
            })

        } catch (error) {
            console.error("Erro ao buscar posts:", error)
        } finally {
            loading.value = false
        }
    }

    return { dataCards, loading, getPosts, featuredCards}
})