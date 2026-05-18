<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePostStore } from '../Stores/PostStore'
import RouteName from "../router/Routes.ts";

const router = useRouter()
const postStore = usePostStore()
const searchInput = ref(postStore.searchTerm)

const searchPosts = () => {
	postStore.setSearchTerm(searchInput.value)
	router.push({ name: RouteName.HomePage })
}
</script>

<template>
	<div class="MainContainer">

		<div class="Tittle">
			<p>New Points of View</p>
		</div>

		<div class="SearchBar">
			<i class="material-icons">search</i>

			<input v-model="searchInput" type="text" placeholder="Search for a matters..." @keyup.enter="searchPosts">

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
	color: var(--color-text);

}

.Tittle{
	display: flex;
	flex-direction: row;
	align-content: center;
	align-items: center;
	margin: 1rem;
	padding-inline: 1rem;
	border-radius: 1rem;
	background-color: var(--color-secondary);
	font-size: 30px;
	box-shadow: var(--shadow-title);
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
	background-color: var(--color-secondary);
	box-shadow: var(--shadow-container);
}

.SearchBar input{
	width: 35rem;
	outline: none;
	background: none;
	border: none;
	color: var(--color-text);
	font-size: 16px;
}

.SearchBar button{
	display: flex;
	justify-content: center;
	gap: 0.2rem;
	flex-direction: row;
	align-content: center;
	align-items: center;
	width: 6.5rem;
	height: 2.5rem;
	color: var(--color-text-secondary);
	background-color: var(--color-accent);
	border-radius: 3rem;
	font-size: 16px;
	border: none;
	box-shadow: var(--shadow-container);
	font-weight: bold;
}

</style>
