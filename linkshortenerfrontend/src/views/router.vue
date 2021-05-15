<template>
    <router-link to="/">Home</router-link>
    <div class="routing">
        <h1>Du wirst weitergeleitet zu: <a v-bind:href="originalLink">{{ originalLink }}</a></h1>
    </div>
    <a href="https://www.hfg-gmuend.de/"><img src="../assets/Gmuend_logo.svg" class="logo"/></a>
</template>
<script>

    import axios from 'axios'
export default {
    async mounted(){
        await axios 
            .get("http://localhost:3000/code/" + this.$route.params.id)
            .then(Response => (this.originalLink = Response.data))
            .catch(error => console.log(error))

        setTimeout(() => {
            if(this.$route.matched.some(({ name }) => name === 'resolveLink'))
                window.location.href = this.originalLink
        }, 5000); 
    },
     data: function(){
    return {
        originalLink: ""
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