<script setup lang="ts">
import Cards from "./Cards.vue";

interface CardItem{
	id:number;
	title:string;
	description:string;
}

//Define o que as propriedades que vai receber do pai
defineProps<{
	cards: CardItem[]
}>();
</script>

<template>
	<div class="Texts">
		<h3>WhiteBoard - Post Section</h3>

		<p>Page 0 - 1</p>

	</div>

	<!-- Card List -->
	<div class="Card-Grid">
		<Cards v-for="item in cards" :key="item.id" :data="item"></Cards>/
	</div>

</template>

<style scoped>

.Card-Grid{
	display: grid;
	/* Garante que a coluna seja dividida em frações iguais */
	grid-template-columns: repeat(4, 4fr);
	align-items: center;
	align-content: center;
	justify-content: center;
	justify-items: center;
}

.Texts{
	color: white;
	display: flex;
	flex-direction: row;
	align-content: center;
	align-items: center;
	margin-inline: 7rem;
	gap: 10rem;
}

</style>