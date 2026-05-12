<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { usePostStore } from '../Stores/PostStore'

const route = useRoute()
const postStore = usePostStore()
const postId = computed(() => Number(route.params.id))

const loadPost = () => {
	if (!Number.isNaN(postId.value)) {
		postStore.getPostById(postId.value)
	}
}

onMounted(loadPost)
watch(() => route.params.id, loadPost)
</script>

<template>
	<div class="MainContainer" v-if="postStore.selectedPost">

		<div class="ImageContainer">
			<img :src="postStore.selectedPost.image" :alt="postStore.selectedPost.title">
			<div class="LikesContainer">
				<div class="Like">
					<p>{{ postStore.selectedPost.reactions?.likes }}</p>
				</div>

				<div class="Dislikes">
					<p>{{ postStore.selectedPost.reactions?.dislikes }}</p>
				</div>
			</div>
		</div>

		<div class="TextsContainer">
			<h1>{{ postStore.selectedPost.title }}</h1>
			<p>{{ postStore.selectedPost.body }}</p>
		</div>

		<div class="CommentsContainer">
			<div v-for="comment in postStore.selectedPost.comments" :key="comment.id" class="Usr">
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
</template>

<style scoped>

</style>
