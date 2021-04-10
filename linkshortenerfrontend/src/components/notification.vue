<template>
    <div v-if="type === 'sucess'">
        <span class="sucessNoti"> {{ message }} </span>
    </div>
</template>

<script>
export default {
    name: 'UrlShortener',
    props: {
        message: String,
        type: String
    },
}
</script>
<style scoped>
div {
    position:absolute;
    left: 30%;
    width: 40%;
    top: 2%;
    text-align: center;
    border-radius: 5%;
}
span {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    display: block;
    margin: 10px 30px 10px 30px;
    padding: 2%;
    color: #ffffff;
}
 .sucessNoti {
     background-color: lightgreen;
 }
</style>