<script setup lang="ts">
import { onMounted } from 'vue'
import { usePostStore } from "../Stores/PostStore"
import BlogHeader from '../Components/BlogHeader.vue'
import SearchTool from "../Components/SearchTool.vue"
import CardList from "../Components/CardList.vue"

const postStore = usePostStore()

// Ao estruturar a pagina, chama a API
onMounted(() => {
	postStore.getPosts()
})
</script>

<template>
	<BlogHeader />
	<SearchTool />

	<p v-if="postStore.loading" style="color: white; text-align: center;">Carregando posts...</p>

	<CardList v-else :cards="postStore.dataCards" />
</template>