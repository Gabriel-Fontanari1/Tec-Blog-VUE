<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { usePostStore } from '../Stores/PostStore'
import BlogHeader from "../Components/BlogHeader.vue";
import SearchTool from "../Components/SearchTool.vue";

const route = useRoute()
const postStore = usePostStore()
const postId = computed(() => Number(route.params.id))
const post = computed(() => postStore.selectedPost)

const loadPost = () => {
	if (!Number.isNaN(postId.value)) {
		postStore.getPostById(postId.value)
	}
}

onMounted(loadPost)
watch(() => route.params.id, loadPost)
</script>

<template>

	<div class="ContainerTopStatic">
		<BlogHeader />
		<SearchTool />
	</div>

	<div class="PageContainer">
		<div class="MainContainerView" v-if="post">
			<div class="ImageContainer">
				<div class="Img"></div>
				<img :src="post.image" :alt="post.title">
				
				<div class="LikesContainer">
					<div class="Like">
						<p>{{ post.reactions?.likes }}</p>
					</div>

					<div class="Dislikes">
						<p>{{ post.reactions?.dislikes }}</p>
					</div>
				</div>
			</div>
			
			

			<div class="TextsContainer">
				<h1>{{ post.title }}</h1>
				<p>{{ post.body }}</p>
			</div>

			<div class="CommentsContainer">
				<div v-for="comment in post.comments" :key="comment.id" class="Usr">
					<img :src="comment.user.image" :alt="comment.user.username">
					<div class="InfoUsrs">
						<h3>{{ comment.user.username }}</h3>
						<p>{{ comment.body }}</p>
					</div>

					<div class="ComementLikes">
						<div class="LikeComment">
							<p>{{ comment.likes }}</p>
						</div>

						<div class="DislikesComment">
							<p>{{ comment.dislikes }}</p>
						</div>
					</div>
				</div>
			</div>

		</div>

		<div v-else class="MainContainer">
			<p v-if="postStore.loading">Carregando post...</p>
			<p v-else>{{ postStore.error }}</p>
			<RouterLink to="/">Voltar</RouterLink>
		</div>
	</div>

</template>

<style scoped>

.ContainerTopStatic {
	display: flex;
	flex-direction: column;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 1000;
	background: #093C5D;
}

.PageContainer {
	padding-top: 17rem;
	width: 100%;
}

.MainContainerView{
	display: flex;
	flex-direction: column;
	color: white;
}

.ImageContainer{
	display: flex;
	flex-direction: column;
	align-items: end;
	align-self: flex-end;
	gap: 1rem;
}

.LikesContainer{
	display: flex;
	flex-direction: row;
	justify-content: end;
}

</style>
