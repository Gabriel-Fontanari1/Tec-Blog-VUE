<script setup lang="ts">

</script>

<template>
    <div class="MainContainer">
        
            <img src="../assets/placeholder.png" alt="">
        
        <div class="TextContainer">
            <input type="button" value="Read More">
            <p>Random Text</p>
        </div>
        
    </div>
</template>

<style scoped>
    
.MainContainer{
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
}

.MainContainer img{
    height: 5rem;
    width:  5rem;
    margin: 0.5rem;
    border-radius: 1rem;
}

.TextContainer{
    display: flex;
    flex-direction: column;
}

.TextContainer input{
    width: 5rem;
}

</style>