<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Post } from '../Interfaces/I-Posts'

const props = defineProps<{
	data: Post
}>();

const router = useRouter()

/* Puxar post com id específico */
const openPost = () => {
	router.push({
		name: 'PostView',
		params: {
			id: props.data.id
		}
	})
}

const limitText = (text: string, max: number) => {
	
	return text.length > max
		? text.slice(0, max) + '...'
		: text
	
}

</script>

<template>
	<div class="MainContainer">

		<img :src="data.image" :alt="data.title" />

		<div class="TextContainer">

			<input type="button" value="Read More" @click="openPost">
			<p>{{ limitText(data.title, 30) }}</p>

			<div class="LikesFeatured">

				<i class="material-icons">thumb_up</i>
				<p class="LikesFeatured">{{ data.reactions.likes }}</p>

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
	box-shadow: var(--shadow-container);
}

.TextContainer{
	color: var(--color-text);
	gap: 0.5rem;
	display: flex;
	flex-direction: column;
}

.TextContainer input{
	display: flex;
	align-self: start;
	color: var(--color-text);
	background: none;
	border: none;
	text-decoration: underline;
	cursor: pointer;
	transition: color 0.3s ease;
}

.TextContainer input:hover{
	color: var(--color-accent);
}

.LikesFeatured{
	display: flex;
	flex-direction: row;
	align-items: center;
	align-content: center;
	gap: 0.5rem;
}

</style>
