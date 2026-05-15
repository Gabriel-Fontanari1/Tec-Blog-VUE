<script setup lang="ts">

import BlogHeader from "../Components/BlogHeader.vue";
import SearchTool from "../Components/SearchTool.vue";
import {usePostStore} from "../Stores/PostStore.ts";
import {useRouter} from "vue-router";
import {ref} from "vue";

const postStore = usePostStore();
const router = useRouter();
const title = ref('')
const body = ref('')
const image = ref('')
const fileInput = ref<HTMLInputElement | null>(null)

function openFileSelector() {
	fileInput.value?.click()
}

function selectImage(event: Event) {
	const input = event.target as HTMLInputElement
	const file = input.files?.[0]

	if (!file) {
		return
	}

	if (!file.type.startsWith('image/')) {
		alert('Selecione um arquivo de imagem.')
		input.value = ''
		return
	}

	const reader = new FileReader()

	reader.onload = () => {
		if (typeof reader.result === 'string') {
			image.value = reader.result
		}
	}

	/* Salva em base 64 */
	reader.readAsDataURL(file)
}

async function publishPost() {
	if (!title.value || !body.value) {
		alert('Titulo e texto devem ser preenchidos.')
		return
	}

	await postStore.addPost({
		title:title.value, body: body.value, image: image.value
	})
	title.value = ''
	body.value = ''
	image.value = new URL('../assets/placeholder.png', import.meta.url).href
	if (fileInput.value) {
		fileInput.value.value = ''
	}
	router.push('/')
	console.log("Post Publicado arquivo create Post")
}
</script>

<template>

	<div class="ContainerTopStatic">
		<BlogHeader/>
		<SearchTool/>
	</div>

	<div class="MainContainerCreate">

		<div class="PageContentCreate">
			<div class="InputsPlaceCreate">

				<div class="HeaderWriteContent">

					<div class="ContainerBorderIcon">
						<i class="material-icons">create</i>
					</div>

					<div class="WriteContentText">
						<h2>Write Your Content</h2>
						<p>Express your thoughts and ideas.</p>
					</div>

				</div>

				<label for="InputTitle">Post Title</label>
				<input type="text" id="InputTitle" v-model= "title" placeholder="Enter an engaging title..."/>

				<label for="TextAreaContent">Content</label>
				<textarea id="TextAreaContent" class="TextInputCreate" placeholder="Write your content here..." v-model="body"></textarea>

			</div>

			<div class="ImagePlaceCreate">

				<div class="MediaSettingsIcons">

					<div class="IconBorderContainer">
						<i class="material-icons">image</i>
					</div>
						
					<div class="TextMedia">

						<h2>Featured Media</h2>
						<p>Make your post stand out.</p>

					</div>

				</div>

				<div class="ImageUpload">
					
					<img v-if="image" :src="image" alt="Selected Image">
					<input ref="fileInput" type="file" accept="image/*" class="FileInput" @change="selectImage">
					<button type="button" class="ButtonUploadImage" @click="openFileSelector">Upload Image</button>

				</div>

				<div class="ButtonsPlaceCreate">
				
					
					<button type="button" @click="publishPost()">
						Publish Post
						<i class="material-icons">send</i>
					</button>
					
				</div>

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
	background: var(--color-primary);
}

.MainContainerCreate {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding-top: 17rem;
	width: 100%;
}

.ImageUpload img{
	height: 15rem;
	width: 20rem;
	box-shadow: var(--shadow-insideContainer);
}

.PageContentCreate{
	box-shadow: var(--shadow-container);
	display: flex;
	flex-direction: row;
	gap: 5rem;
	margin: 1rem;
	background: var(--color-secondary);
	padding: 5rem;
	border-radius: 2rem;
}

.PageContentCreate h2{
	color: white;
}

.InputsPlaceCreate{
	display: flex;
	width: 30rem;
	flex-direction: column;
	gap: 0.5rem;
}

.InputsPlaceCreate input{
	border: 3px solid var(--color-accent);
	background-color: var(--color-secondary);
	color: white;
	padding-inline: 1rem;
	height: 2.5rem;
	border-radius: 0.5rem;
	margin-bottom: 1rem;
	box-shadow: var(--shadow-insideContainer);
}

.InputsPlaceCreate textarea{
	background-color: var(--color-secondary);
	color: white;
	border: 2px solid var(--color-accent);
	box-shadow: var(--shadow-insideContainer);
}

.ButtonsPlaceCreate{
	display: flex;
	flex-direction: row;
	justify-content: end;
	margin-top: 1rem;
}

.ButtonsPlaceCreate button{
	display: flex;
	flex-direction: row;
	width: 9rem;
	gap: 0.5rem;
	align-items: center;
	justify-content: center;
	height: 2rem;
	border-radius: 0.5rem;
	margin-top: 0.5rem;
	background-color: var(--color-accent);
	box-shadow: var(--shadow-container);
	border: 2px solid white;
	font-weight: bold;
}

.ButtonsPlaceCreate button i{
	font-size: 1.5rem;
}

.InputsPlaceCreate label{
	color: #fff;
}

.ImageUpload {
	position: relative;
	width: 20rem;
	height: 15rem;
	background: var(--color-secondary);
	border: 5px dotted var(--color-accent);
	border-radius: 0.5rem;
	box-shadow: var(--shadow-insideContainer);
}

.ButtonUploadImage {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 10rem;
	height: 3rem;
	border-radius: 1rem;
	color: black;
	background-color: var(--color-accent);
	box-shadow: var(--shadow-container);
	border: 2px solid white;
	cursor: pointer;
	z-index: 10;
	font-weight: bold;
}

.FileInput {
	display: none;
}

.TextInputCreate {
	width: 100%;
	height: 9rem;
	padding: 1rem;
	border-radius: 1rem;
	resize: none;
	outline: none;
	font-size: 1rem;
}

.HeaderWriteContent{
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 1rem;
	align-content: center;
	margin-bottom: 1.1rem;
}

.ContainerBorderIcon{
	display: flex;
	flex-direction: row;
	color: var(--color-accent);
	background-color: var(--color-secondary);
	align-content: center;
	box-shadow: var(--shadow-insideContainer);
	align-items: center;
	justify-content: center;
	border-radius: 100rem;
   padding: 0.5rem;
	border: 3px solid var(--color-accent);
}

.WriteContentText{
	color: white;
}

.WriteContentText p{
	opacity: 50%;
}

.MediaSettingsIcons{
	display: flex;
	flex-direction: row;
	gap: 1rem;
}

.MediaSettingsIcons{
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-bottom: 3rem;
}

.IconBorderContainer{
	display: flex;
	color: var(--color-accent);
	background-color: var(--color-secondary);
	padding: 0.5rem;
	border-radius: 100rem;
	box-shadow: var(--shadow-insideContainer);
	border: 3px solid var(--color-accent);
}

.TextMedia{
	color: white;
}

.TextMedia p{
	opacity: 50%;
}

</style>
