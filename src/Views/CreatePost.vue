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
const image = ref(new URL('../assets/placeholder.png', import.meta.url).href)
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
				<h2>Write Your Content</h2>
				
                <label for="InputTitle">Post Title</label>
                <input type="text" id="InputTitle" v-model= "title"/>

				<label for="TextAreaContent">Content</label>
                <textarea id="TextAreaContent" class="TextInputCreate" placeholder="Insert your text here..." v-model="body"></textarea>
            </div>

            <div class="ImagePlaceCreate">
				<h2>Featured Media & Settings</h2>
				
                <div class="ImageUpload">
                    <img :src="image" alt="Selected Image">
                    <input
                        ref="fileInput"
                        type="file"
                        accept="image/*"
                        class="FileInput"
                        @change="selectImage"
                    >
                    <button type="button" class="ButtonUploadImage" @click="openFileSelector">Upload Image</button>
                </div>

                <div class="ButtonsPlaceCreate">
                    <button type="button" @click="publishPost()">Publish Post</button>
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
    background: #093C5D;
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
}

.PageContentCreate{
	box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    display: flex;
    flex-direction: row;
    gap: 5rem;
    margin: 2rem;
    background: #0B4A72;
    padding: 5rem;
    border-radius: 2rem;
}

.PageContentCreate h2{
	margin-bottom: 1rem;
	color: white;
}

.InputsPlaceCreate{
    display: flex;
    width: 30rem;
    flex-direction: column;
	gap: 1rem;
}

.InputsPlaceCreate input{
	border-radius: 0.5rem;
	border: 2px solid white;
}

.ButtonsPlaceCreate{
    display: flex;
    flex-direction: row;
    justify-content: end;
    margin-top: 1rem;
}

.ButtonsPlaceCreate button{
    width: 6rem;
    height: 2rem;
    border-radius: 0.5rem;
    margin-top: 0.5rem;
    border-color: white;
    background-color: #5DF8D8;
}

.InputsPlaceCreate label{
    color: #fff;
}

.HeadderCreate{
    color: white;
    display: flex;
    flex-direction: row;
    gap: 28rem;
    justify-content: space-between;
}

.ImageUpload {
    position: relative;
    width: 20rem;
    height: 15rem;
}

.ImageUpload img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 1rem;
}

.ButtonUploadImage {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10rem;
    height: 3rem;
    border: none;
    border-radius: 1rem;
    background-color: rgba(0, 0, 0, 0.6);
    cursor: pointer;
    z-index: 10;
    color: white;
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

</style>
