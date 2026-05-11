<script setup lang="ts">

//Recebe objeto data do v-for do pai
defineProps<{
	data: any
}>();

</script>

<template>
	<div class="MainContainer">
		<div class="Content">
			<img src="../assets/placeholder.png" alt="" >

			<div class="TextContent">
				<p class="UserTag">Usuário: {{ data.userId }}</p>
				<h3>{{ data.title }}</h3>
				<p class="PostBody">{{ data.body }}</p>
			</div>

			<input type="button" value="Read More">
		</div>
	</div>
</template>

<style scoped>
.MainContainer {
	display: flex;
	flex-direction: column;
	background-color: #0B4A72;
	height: 24rem;
	width: 15rem;
	color: white;
	border-radius: 2rem;
	overflow: hidden;
	padding: 1rem;
	box-sizing: border-box;
	margin: 1rem;
}

.Content {
	display: flex;
	flex-direction: column;
	height: 100%;
	justify-content: space-between;
}

.Content img {
	width: 100%;
	height: 8rem;
	object-fit: cover;
	border-radius: 1rem;
}

.TextContent {
	display: flex;
	flex-direction: column;
	gap: 0.2rem;
	flex-grow: 1;
	margin-top: 0.5rem;
}

.TextContent h3 {
	font-size: 1.1rem;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	margin: 0.3rem 0;
}

.TextContent .PostBody {
	font-size: 0.85rem;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	overflow: hidden;
	color: #cbd5e0;
}

.UserTag {
	font-size: 0.7rem;
	text-transform: uppercase;
	opacity: 0.8;
}

.Content input {
	align-self: center;
	color: white;
	width: 10rem;
	background: none;
	border: none;
	text-decoration: underline;
	cursor: pointer;
	padding: 0.5rem 0;
	transition: color 0.3s ease;
}

.Content input:hover {
	color: #5DF8D8;
}
</style>