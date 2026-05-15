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
			<div class="PostContainer">

				<div class="TextsContainer">

					<h1>{{ post.title }}</h1>
					<div class="divider"></div>
					<p>{{ post.body }}</p>

				</div>

				<div class="ImageContainer">

					<div class="Img"></div>

					<img :src="post.image" :alt="post.title">

					<div class="LikesContainer">

						<div class="Like">

							<i class="material-icons">thumb_up</i>
							<p>{{ post.reactions?.likes }}</p>

						</div>

						<div class="Dislikes">

							<i class="material-icons">thumb_down</i>
							<p>{{ post.reactions?.dislikes }}</p>

						</div>

					</div>

				</div>

			</div>

			<div class="CommentsContainer">

				<div class="HeadderComment">

					<div class="TittleComentSection">

						<h2>Comment Section</h2>
					</div>

				</div>

				<div v-if="post.comments.length > 0">

					<div v-for="comment in post.comments" :key="comment.id" class="Usr">

						<img :src="comment.user.image" :alt="comment.user.username">

						<div class="InfoUsrs">

							<h3>{{ comment.user.username }}</h3>
							<p>{{ comment.body }}</p>

						</div>

						<div class="LikeComment">

							<i class="material-icons">thumb_up</i>
							<p>{{ comment.likes }}</p>

						</div>

					</div>

				</div>

				<div v-else class="NoComments">

					<p>No comments...</p>

				</div>

			</div>

		</div>

		<div v-else class="LoadingContainer">
			<p v-if="postStore.loading">Loading posts...</p>
			<p v-else>{{ postStore.error }}</p>
			<RouterLink to="/">Voltar</RouterLink>
		</div>
	</div>

</template>

<style scoped>

.LoadingContainer{
	color: white;
	display: flex;
	flex-direction: column;
}

.LoadingContainer RouterLink{
	color: white;
	display: flex;
	flex-direction: column;
}

.ContainerTopStatic {
	display: flex;
	flex-direction: column;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 1000;
	background: var(--color-primary);
}

.PageContainer {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding-top: 17rem;
	width: 100%;
}

.MainContainerView{
	background-color: var(--color-secondary);
	display: flex;
	flex-direction: column;
	color: white;
	margin-inline: 2rem;
	margin-bottom: 2rem;
	border-radius: 1rem;
	width: min(100% - 4rem, 75rem);
	overflow: hidden;
	box-shadow: var(--shadow-container);
}

.ImageContainer{
	display: flex;
	flex-direction: column;
	align-items: end;
	align-self: flex-end;
	gap: 1rem;
	margin-inline: 3rem;
}

.ImageContainer img{
	width: 25rem;
	height: 15.625rem;
	object-fit: cover;
	border-radius: 1rem;
	box-shadow: var(--shadow-container);
}

.LikesContainer {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 1rem;
	margin-bottom: 1rem;
}

.Like,
.Dislikes {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	height: 2.5rem;
	min-width: 5rem;
	padding: 0 1rem;
	border-radius: 0.7rem;
	background-color: var(--color-secondary);
	color: white;
}

.Like p,
.Dislikes p {
	margin: 0;
}

.material-icons {
	font-size: 1.2rem;
}

.PostContainer{
	display: flex;
	flex-direction: row;
	margin: 2rem;
	border-radius: 1rem;
	overflow: hidden;
	text-align: justify;
}

.TextsContainer{
	display: flex;
	flex-direction: column;
	align-items: center;
	align-content: center;
	justify-content: center;
	justify-items: center;
	align-self: center;
	gap: 1rem;
	width: 100%;
}

.PostContainer p,
.PostContainer h1{
	width: 70%;
}

.PostContainer h1{
	text-align: center;
}

.Usr{
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 1rem;
	margin-inline: 13rem;
	margin-block: 2rem;
	border-radius: 1rem;
	padding: 0.5rem;
	border: 1px solid white;
	box-shadow: var(--shadow-container);
}

.Usr img{
	border-radius: 1rem;
	box-shadow: var(--shadow-container);
}

.InfoUsrs{
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 1rem;
	flex: 1;
	min-width: 0;
}

.CommentsContainer{
	background-color: var(--color-secondary);
}

.LikeComment{
	display: flex;
	flex-direction: row;
	border-radius: 1rem;
	padding: 1rem;
	gap: 0.5rem;
	margin-left: auto;
	margin-right: 1rem;
}

.HeadderComment{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-inline: 14rem;
	align-content: center;
	align-items: center;
	margin-top: 1rem;
}

.NoComments{
	display: flex;
	align-items: center;
	margin-inline: 14rem;
	margin-top: 1rem;
	text-decoration: underline;
	opacity: 50%;
	margin-bottom: 2rem;
}

</style>
