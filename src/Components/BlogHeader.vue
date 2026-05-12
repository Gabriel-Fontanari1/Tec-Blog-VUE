<!-- FINALIZADO -->

<script setup lang="ts">

</script>

<template>

	<div class="MainContainer">

		<div class="ImgSection">
			<img src="../assets/NewLogoBlog.png" alt="">
		</div>

		<div class="Navigators">
			<p>Home</p>

			<p>Services</p>

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
	background: #0B4A72;
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
	background-color: #5DF8D8;
	border-color: white;
	color: white;
}

.ButtonSection i{
	font-size: 20px;
}

.ButtonSection button:nth-child(2){
	background-color: #0B4A72;

}

.Navigators{
	display: flex;
	flex-direction: row;
	gap: 2rem;
	padding-inline: 3rem;
}

</style>