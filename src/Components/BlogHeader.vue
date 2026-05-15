<!-- FINALIZADO -->

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>

	<div class="MainContainer">

		<div class="ImgSection">

			<img src="../assets/NewLogoBlog.png" alt="">

		</div>

		<div class="Navigators">

			<RouterLink to="/">Home</RouterLink>
			<RouterLink to="/create">Create</RouterLink>
			<p>About</p>
			<p>Contact</p>

		</div>

		<div class="ButtonSection">

			<button class="BtnStarted">

				<p>Get Started</p>
				<i class="material-icons">playlist_add</i>

			</button>

			<button class="BtnLogIn">

				<p>Sign In</p>
				<i class="material-icons">subdirectory_arrow_right</i>

			</button>

		</div>

	</div>

</template>

<style scoped>

*{
	font-size: 16px;
}

.MainContainer{
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-content: center;
	align-items: center;
	color: white;
	gap: 5rem;
	background: var(--color-secondary);
	padding: 0.5rem;
}

.ImgSection{
	display: flex;
	flex-direction: row;
	height: 3.5rem;
	width: 3.5rem;
}

.ButtonSection{
	display: flex;
	flex-direction: row;
	gap: 1rem;
}

.ButtonSection button{
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-content: center;
	align-items: center;
	padding-inline: 1rem;
	height: 2.3rem;
	gap:0.5rem;
	border-radius: 0.5rem;
	background-color: var(--color-accent);
	border: 2px solid white;
	font-weight: bold;
	color: black;
	box-shadow: var(--shadow-container);
}

.ButtonSection button:nth-child(2){
	color: white;
}

.ButtonSection i{
	font-size: 20px;
}

.ButtonSection button:nth-child(2){
	background-color: var(--color-secondary);

}

.Navigators{
	display: flex;
	flex-direction: row;
	gap: 2rem;
	padding-inline: 3rem;
}


.Navigators a{
	color: white;
	text-decoration: none;
}

.Navigators a:hover{
	color: var(--color-accent);
}

</style>
