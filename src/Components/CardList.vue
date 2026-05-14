<script setup lang="ts">
import Cards from "./Cards.vue";
import type { Post } from "../Interfaces/I-Posts";
import {computed, ref, watch} from "vue";

//Define o que as propriedades que vai receber do pai
const props = defineProps<{
    cards: Post[]
}>();

/* Verificacao de paginas */
const currentPage = ref(0);
const cardsPerPage = 12;
const totalPages = computed(() => {
    return Math.max(1, Math.ceil(props.cards.length / cardsPerPage));
})

/* Pagina atual */
const paginatedCards = computed(() => {
    const start = currentPage.value * cardsPerPage;
    const end = start + cardsPerPage;
    return props.cards.slice(start, end);
})

watch(() => props.cards, () => {
    currentPage.value = 0
})

/* Proxima pagina */
function nextPage() {
    if (currentPage.value < totalPages.value -1) {
        currentPage.value++
    }
}

/* Pagina anterior */
function previusPage() {
    if (currentPage.value > 0) {
        currentPage.value--
    }
}

</script>

<template>
    <div class="Texts">

        <div class="TextStart">
            <h3>WhiteBoard - Post Section</h3>
        </div>

        <div class="TextEnd">

            <p>Page {{currentPage + 1}} - {{totalPages}}</p>

            <div class="TextBtns">
                <button class="BtnPrevius" @click="previusPage()" :disabled="currentPage === 0">
                    <i class="material-icons">arrow_back</i>
                </button>

                <button class="BtnNext" @click="nextPage()" :disabled="currentPage === totalPages - 1">
                    <i class="material-icons">arrow_forward</i>
                </button>
            </div>

        </div>

    </div>

    <!-- Card List -->
    <div class="Card-Grid">
        <Cards v-for="item in paginatedCards" :key="item.id" :data="item" />
    </div>

    <p v-if="props.cards.length === 0" class="NoResults">Nenhum post encontrado.</p>

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

.NoResults{
    color: white;
    text-align: center;
    margin-top: 2rem;
}

</style>
