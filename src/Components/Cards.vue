<script setup lang="ts">

</script>

<template>

    <div class="MainContainer">
        <div class="Content">
            <img src="../assets/placeholder.png" alt="">
            
            <div class="TextContent">
                <p>Usuario</p>
                <h2>Tittle</h2>
                <p>Random-Text</p>
            </div>
            
            <input type="button" value="Read More">
        </div>
    </div>  

</template>

<style scoped>
.MainContainer{
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #0B4A72;
    height: 25rem;
    width: 15rem;
    margin: 5rem;
    border-radius: 2rem;
}

.TextContent{
    display: flex;
    flex-direction: column;
    padding-block: 1rem;
    gap: 1rem;
}

.Content{
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.Content input{
    align-items: center;
    align-content: center;
    align-self: center;
    width: 10rem;
}

</style>

