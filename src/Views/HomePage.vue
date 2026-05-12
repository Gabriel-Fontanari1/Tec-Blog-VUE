<script setup lang="ts">
import { onMounted } from 'vue'
import { usePostStore } from "../Stores/PostStore"
import BlogHeader from '../Components/BlogHeader.vue'
import SearchTool from "../Components/SearchTool.vue"
import CardList from "../Components/CardList.vue"
import FeaturedCards from "../Components/FeaturedCards.vue";

const postStore = usePostStore()

// Ao estruturar a pagina, chama a API
onMounted(() => {
	postStore.getPosts()
})
</script>

<template>
	<div class="ContainerTopStatic">
		<BlogHeader />
		<SearchTool />
	</div>
	
	<div class="PageContainer">
		<p v-if="postStore.loading" style="color: white; text-align: center;" class="LoadingText">Carregando posts...</p>
		<p v-else-if="postStore.error" class="LoadingText">{{ postStore.error }}</p>
		
		<div v-else class="ContentLayout">
			<div class="CardsList">
				<CardList :cards="postStore.dataCards" />
			</div>
			
			<div class="FeaturedCards">
				<FeaturedCards v-for="post in postStore.featuredCards" :key="post.id" :data="post"/>
			</div>
		</div>
	</div>
		
</template>

<style scoped>

.ContainerTopStatic {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 1000;
	background: #093C5D;
}

.PageContainer{
	display: flex;
	justify-content: center;
	align-items: center;
	padding-top: 17rem;
	width: 100%;
}

.LoadingText{
	color:white;
	text-align: center;
}

.ContentLayout{
	display: flex;
	justify-items: start;
	align-items: flex-start;
	gap: 1rem;
}

.FeaturedCards{
	position: sticky;
	display: flex;
	flex-direction: column; 
	margin-block: 3rem;
	gap: 1rem;
}

</style>
