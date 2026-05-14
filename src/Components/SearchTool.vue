<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePostStore } from '../Stores/PostStore'

const router = useRouter()
const postStore = usePostStore()
const searchInput = ref(postStore.searchTerm)

const searchPosts = () => {
    postStore.setSearchTerm(searchInput.value)
    router.push({ name: 'HomePage' })
}
</script>

<template>
    <div class="MainContainer">

        <div class="Tittle">
            <h1>New Points of View</h1>
        </div>

        <div class="SearchBar">
            <i class="material-icons">search</i>

            <input
                v-model="searchInput"
                type="text"
                placeholder="Search for a matters..."
                @keyup.enter="searchPosts"
            >

            <button class="BtnSearch" @click="searchPosts">
                <p>Search</p>
                <i class="material-icons">arrow_forward</i>
            </button>
        </div>

    </div>

</template>

<style scoped>

.MainContainer{
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    background-image: url("../assets/background-blog.jpg");
    color: white;
}

.Tittle{
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    margin: 1rem;
    padding-inline: 1rem;
    border-radius: 1rem;
    background-color: #0B4A72;
    font-family: Kavoon, serif;
}

.SearchBar{
    display: flex;
    flex-direction: row;
    align-items: center;
    align-content: center;
    padding: 0.5rem;
    border-radius: 3rem;
    margin-bottom:1rem;
    gap: 1rem;
    background-color: #0B4A72;
}

.SearchBar input{
    width: 35rem;
}

.SearchBar button{
    display: flex;
    justify-content: center;
    gap: 0.2rem;
    flex-direction: row;
    align-content: center;
    align-items: center;
    width: 6rem;
    height: 3rem;
    color: white;
    background-color: #5DF8D8;
    border-color: white;
    border-radius: 3rem;
    font-size: 16px;
}

</style>
