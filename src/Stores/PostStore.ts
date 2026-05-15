import {defineStore} from 'pinia'
import {computed, ref, watch} from 'vue'
import type { ApiComment, ApiPost, CommentsResponse, Post, PostsResponse, CreatePostInput } from '../Interfaces/I-Posts'
/* Chave padrao para salvar dados no localstorage */
const CREATED_POSTS_STORAGE_KEY = 'createdPosts'

const loadCreatedPosts = (): Post[] => {
    const createdPosts = localStorage.getItem(CREATED_POSTS_STORAGE_KEY)

    if (!createdPosts) {
        return []
    }

    try {
        return JSON.parse(createdPosts) as Post[]
    } catch (caughtError) {
        console.error('Erro ao carregar posts criados', caughtError)
        return []
    }
}

/* Liberar os valores para serem usados nos v: */
export const usePostStore = defineStore('post', () => {
    const dataCards = ref<Post[]>([])
    const selectedPost = ref<Post | null>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)
    const dataCreatedPosts = ref<Post[]>(loadCreatedPosts())
    const searchTerm = ref('')
    const featuredCards = computed(() => {
        //Cria uma copia do array
        return [...allPosts.value]
            .sort((a, b) => b.reactions.likes - a.reactions.likes)
            .slice(0, 4)
    })

    const allPosts = computed(() => {
        return [...dataCards.value, ...dataCreatedPosts.value]
    })

    const filteredPosts = computed(() => {
        /* Sem espaço e sem caps */
        const term = searchTerm.value.trim().toLowerCase()

        if (!term) {
            return allPosts.value
        }

        return allPosts.value.filter((post) => post.title.toLowerCase().startsWith(term))
    })

    const setSearchTerm = (term: string) => {
        searchTerm.value = term
    }

    /* Inserir um post criado na lista de posts */
    const addPost = async (post: CreatePostInput): Promise<void> => {
        error.value = null
        try {
            const id = Date.now()
            console.log("Entrou na criacao de post")
            const newPost: Post = {
                id, title: post.title, body: post.body, tags: [''],
                reactions: {
                    likes: Math.floor (Math.random() * 50) + 1,
                    dislikes: Math.floor (Math.random() * 50) + 1,
                },
                views: 0, userId: 1, image: post.image, comments:[]
            }
            dataCreatedPosts.value.unshift(newPost)
            console.log("Post Publicado arquivo PostStore")
        } catch (caughtError) {
            console.error('Erro ao adicionar post', caughtError)
            error.value = 'Nao foi possivel adicionar post'
        }
    }

    watch(dataCreatedPosts, (posts) => {
        localStorage.setItem(CREATED_POSTS_STORAGE_KEY, JSON.stringify(posts))
    }, { deep: true })

    /* Formata os coment de cada post */
    const formatPost = async (post: ApiPost): Promise<Post> => {
        let comments: Post['comments'] = []

        try {
            const commentsResponse = await fetch(`https://dummyjson.com/comments/post/${post.id}`)
            if (commentsResponse.ok) {
                const commentsData: CommentsResponse = await commentsResponse.json()

                comments = commentsData.comments
                    .map((comment: ApiComment) => {
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
            ...post,
            image: `https://picsum.photos/seed/${post.id}/400/250`,
            comments: comments,
        }
    }

    /* Puxa os posts para home */
    const getPosts = async () => {
        loading.value = true
        error.value = null
        try {
            const postsResponse = await fetch('https://dummyjson.com/posts?limit=30')
            if (!postsResponse.ok) {
                throw new Error('Nao foi possivel buscar os posts')
            }

            const postsData: PostsResponse = await postsResponse.json()

            const posts = postsData.posts

            dataCards.value = await Promise.all(posts.map(formatPost))

        } catch (caughtError) {
            console.error('Erro ao buscar posts:', caughtError)
            dataCards.value = []
            error.value = 'Nao foi possivel carregar os posts.'
        } finally {
            loading.value = false
        }
    }

    /* Puxa os posts para o PostView especifico */
    const getPostById = async (id: number) => {
        loading.value = true
        error.value = null

        try {
            /* busca nos posts ja carregados no ap */
            const existingPost = allPosts.value.find((post) => post.id === id)

            if (existingPost) {
                selectedPost.value = existingPost
                return
            }

            /* Se nao estiver no array, busca diretamente na api */
            const postResponse = await fetch(`https://dummyjson.com/posts/${id}`)
            if (!postResponse.ok) {
                throw new Error('Nao foi possivel buscar o post')
            }

            /* Formata */
            const postData: ApiPost = await postResponse.json()
            selectedPost.value = await formatPost(postData)
        } catch (caughtError) {
            console.error('Erro ao buscar post:', caughtError)
            selectedPost.value = null
            error.value = 'Nao foi possivel carregar o post.'
        } finally {
            loading.value = false
        }
    }

    /* deixa tudo disponivel para uso */
    return {
        dataCards,
        selectedPost,
        loading,
        error,
        allPosts,
        filteredPosts,
        searchTerm,
        getPosts,
        getPostById,
        addPost,
        featuredCards,
        setSearchTerm
    }
})
