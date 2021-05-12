<template>
    <div class="routing">
        <h1>Du wirst weitergeleitet zu: {{ $route.params.url }}</h1>
    </div>
</template>
<script>
export default {
    mounted(){
        window.location.href = 'https://google.com'
    }
}
</script>