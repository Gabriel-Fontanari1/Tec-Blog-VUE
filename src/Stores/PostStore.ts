import {defineStore} from 'pinia'
import {computed, ref} from 'vue'
import type { ApiComment, ApiPost, CommentsResponse, Post, PostsResponse, CreatePostInput } from '../Interfaces/I-Posts'

/* Liberar os valores para serem usados nos : */
export const usePostStore = defineStore('post', () => {
    const dataCards = ref<Post[]>([])
    const selectedPost = ref<Post | null>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)
    const dataCreatedPosts = ref<Post[]>([])
    const featuredCards = computed(() => {
        //Cria uma copia do array
        return [...allPosts.value]
            .sort((a, b) => b.reactions.likes - a.reactions.likes)
            .slice(0, 4)
    })
    
    const allPosts = computed(() => {
        return [...dataCards.value, ...dataCreatedPosts.value]
    })

    /* Inserir um post criado na lista de posts */
    const addPost = async (post: CreatePostInput): Promise<void> => {
        error.value = null
        try {
            const id = Math.random() * (500 - 1) + 1
            console.log("Entrou na criacao de post")
            const newPost: Post = {
                id, title: post.title, body: post.body, tags: ['created'],
                reactions: {
                    likes: Math.floor (Math.random() * 50) + 1,
                    dislikes: Math.floor (Math.random() * 50) + 1,
                },
                views: 0, userId: 1, image: `https://picsum.photos/seed/post-${id}/400/250`, comments:[]
            }
            dataCreatedPosts.value.unshift(newPost)
            console.log("Post Publicado arquivo PostStore")
        } catch (caughtError) {
            console.error('Erro ao adicionar post', caughtError)
            error.value = 'Nao foi possivel adicionar post'
        }
    }

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
            const existingPost = allPosts.value.find((post) => post.id === id)

            if (existingPost) {
                selectedPost.value = existingPost
                return
            }

            const postResponse = await fetch(`https://dummyjson.com/posts/${id}`)
            if (!postResponse.ok) {
                throw new Error('Nao foi possivel buscar o post')
            }

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
        getPosts,
        getPostById,
        addPost,
        featuredCards
    }
})
