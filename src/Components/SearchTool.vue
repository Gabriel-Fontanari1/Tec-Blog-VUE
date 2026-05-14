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
            <p>New Points of View</p>
        </div>

        <div class="SearchBar">
            <i class="material-icons">search</i>

            <input
                v-model="searchInput" type="text" placeholder="Search for a matters..." @keyup.enter="searchPosts"
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
	font-size: 30px;
	box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.9) 0px 0px 0px 1px;
}

.Tittle p{
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
	box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
}

.SearchBar input{
    width: 35rem;
	outline: none;
	background: none;
	border: none;
	color: white;
	font-size: 16px;
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
    color: black;
    background-color: #5DF8D8;
    border-radius: 3rem;
    font-size: 16px;
	border: 2px solid white;
}

</style>
