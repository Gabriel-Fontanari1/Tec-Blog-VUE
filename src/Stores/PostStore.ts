import {defineStore} from 'pinia'
import {computed, ref} from 'vue'

export const usePostStore = defineStore('post', () => {
    const dataCards = ref<any[]>([])
    const selectedPost = ref<any | null>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)
    const featuredCards = computed(() => {
        //Cria uma copia do array
        return [...dataCards.value]
            .sort((a, b) => b.reactions.likes - a.reactions.likes)
            .slice(0, 4)
    })


    const formatPost = async (post: any) => {
        let comments: any[] = []

        try {
            const commentsResponse = await fetch(`https://dummyjson.com/comments/post/${post.id}`)
            if (commentsResponse.ok) {
                const commentsData = await commentsResponse.json()

                comments = commentsData.comments
                    .slice(0, 5)
                    .map((comment: any) => {
                        return {
                            ...comment,
                            dislikes: 0,

                            user: {
                                ...comment.user,
                                image: `https://picsum.photos/seed/user-${comment.user.id}/100/100`
                            }
                        }
                    })
            }
        } catch (caughtError) {
            console.error(`Erro ao buscar comentarios do post ${post.id}:`, caughtError)
        }

        return {
            /* Spread Operator, copia tudo do objeto */
            ...post,
            image: `https://picsum.photos/seed/${post.id}/400/250`,
            comments: comments,
        }
    }

    const getPosts = async () => {
        loading.value = true
        error.value = null
        try {
            const postsResponse = await fetch('https://dummyjson.com/posts')
            if (!postsResponse.ok) {
                throw new Error('Nao foi possivel buscar os posts')
            }

            const postsData = await postsResponse.json()
            /* Divide em 16 posts */
            const posts = postsData.posts.slice(0, 16)

            dataCards.value = await Promise.all(posts.map(formatPost))

        } catch (caughtError) {
            console.error('Erro ao buscar posts:', caughtError)
            dataCards.value = []
            error.value = 'Nao foi possivel carregar os posts.'
        } finally {
            loading.value = false
        }
    }

    const getPostById = async (id: number) => {
        loading.value = true
        error.value = null

        try {
            const existingPost = dataCards.value.find((post) => post.id === id)

            if (existingPost) {
                selectedPost.value = existingPost
                return
            }

            const postResponse = await fetch(`https://dummyjson.com/posts/${id}`)
            if (!postResponse.ok) {
                throw new Error('Nao foi possivel buscar o post')
            }

            const postData = await postResponse.json()
            selectedPost.value = await formatPost(postData)
        } catch (caughtError) {
            console.error('Erro ao buscar post:', caughtError)
            selectedPost.value = null
            error.value = 'Nao foi possivel carregar o post.'
        } finally {
            loading.value = false
        }
    }

    return {
        dataCards,
        selectedPost,
        loading,
        error,
        getPosts,
        getPostById,
        featuredCards
    }
})
