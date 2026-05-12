<script setup lang="ts">
import Cards from "./Cards.vue";

interface CardItem{
	id:number;
	title:string;
	body:string;
	image:string;
}

//Define o que as propriedades que vai receber do pai
defineProps<{
	cards: CardItem[]
}>();
</script>

<template>
	<div class="Texts">
		
		<div class="TextStart">
			<h3>WhiteBoard - Post Section</h3>
		</div>
			
		<div class="TextEnd">	
			
			<p>Page 0 - 1</p>
			
			<div class="TextBtns">
				<button class="BtnPrevius">
					<i class="material-icons">arrow_back</i>
				</button>
	
				<button class="BtnNext">
					<i class="material-icons">arrow_forward</i>
				</button>
			</div>
			
		</div>
			
	</div>

	<!-- Card List -->
	<div class="Card-Grid">
		<Cards v-for="item in cards" :key="item.id" :data="item" />
	</div>

</template>

<style scoped>

.Card-Grid{
	display: grid;
	/* Garante que a coluna seja dividida em frações iguais */
	grid-template-columns: repeat(4, 1fr);
	align-items: center;
	align-content: center;
	justify-content: center;
	justify-items: center;
}

.Texts{
	color: white;
	display: flex;
	flex-direction: row;
	align-self: center;
	align-content: center;
	align-items: center;
	justify-content: space-between;
	margin-inline: 2%;
}

.TextEnd{
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 1rem;
}


.TextBtns{
	display: flex;
	flex-direction: row;
	gap: 0.5rem;
	align-self: center;
	align-content: center;
	justify-content: center;
}

.BtnPrevius{
	border-radius: 1rem;
	border-color: white;
	padding: 0.2rem;
}

.BtnNext{
	border-color: white;
	border-radius: 1rem;
	padding: 0.2rem;
}

</style>
