<template>
    <router-link to="/">Bring mich zurück!</router-link>
    <div class="routing">
        <h1>Du wirst weitergeleitet zu: <a v-bind:href="originalLink">{{ originalLink }}</a></h1>
        <h3>Dieser Link wurde bereits {{ clickCounter }} mal benutzt!</h3>
    </div>
    <a href="https://www.hfg-gmuend.de/"><img src="../assets/Gmuend_logo.svg" class="logo"/></a>
</template>
<script>

import axios from 'axios'
export default {
    async mounted(){
        await axios 
            .get("http://localhost:3000/code/" + this.$route.params.id)
            .then(res => {
                this.originalLink = res.data.url;
                this.clickCounter = res.data.clickCounter;
            })
            .catch(error => console.log(error))

        setTimeout(() => {
            if(this.$route.matched.some(({ name }) => name === 'resolveLink'))
            console.log("weiterleitung juhu");
            window.location.href = this.originalLink
        }, 5000); 
    },
     data: function(){
    return {
        originalLink: "",
        clickCounter: 0
        }
     }
}
</script>
<style scoped>
.logo {
position: absolute;
left: 30px;
top: 800px;
}
</style>