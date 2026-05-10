<script setup lang="ts">

</script>

<template>

    <div class="MainContainer">
        <div class="Content">
            <img src="../assets/placeholder.png" alt="" >
            
            <div class="TextContent">
                <p>Usuario</p>
                <h3>Tittle</h3>
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
    height: 24rem;
    color: white;
    width: 15rem;
    margin: 5rem;
    border-radius: 2rem;
}

.TextContent{
    display: flex;
    flex-direction: column;
    margin-inline: 1rem;
}

.Content{
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.Content input{
    align-items: center;
    align-content: center;
    align-self: center;
    color: white;
    width: 10rem;
    background: none;
    border: none;
    text-decoration: underline;
}

.Content input:hover{
    color: #5DF8D8;
}

.Content img{
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    align-self: center;
    height: 10rem;
    width: 14rem;
    border-radius: 1rem;
}

</style>

