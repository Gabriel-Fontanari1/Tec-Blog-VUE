<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Post } from '../Interfaces/I-Posts'

const props = defineProps<{
    data: Post
}>();

const router = useRouter()

const openPost = () => {
    router.push({
        name: 'PostView',
        params: {
            id: props.data.id
        }
    })
}
</script>

<template>
    <div class="MainContainer">

        <img :src="data.image" :alt="data.title" />

        <div class="TextContainer">
            <input type="button" value="Read More" @click="openPost">
            <p>{{data.title}}</p>
            <div class="LikesFeatured">
                <p class="LikesFeatured">{{ data.reactions.likes }}</p>
                <i class="material-icons">thumb_up</i>
            </div>
        </div>

    </div>
</template>

<style scoped>

.MainContainer{
    display: flex;
    flex-direction: row;
    align-content: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    align-items: center;
}

.MainContainer img{
    height: 5rem;
    width:  5rem;
    margin: 0.5rem;
    border-radius: 1rem;
}

.TextContainer{
    color: white;
    gap: 0.5rem;
    display: flex;
    flex-direction: column;
}

.TextContainer input{
    display: flex;
    align-self: start;
    color: white;
    background: none;
    border: none;
    text-decoration: underline;
    cursor: pointer;
    transition: color 0.3s ease;
}

.TextContainer input:hover{
    color: #5DF8D8;
}

.LikesFeatured{
    display: flex;
    flex-direction: row;
    align-items: center;
    align-content: center;
    gap: 1rem;
}

</style>
