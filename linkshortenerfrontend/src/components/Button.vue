<template>
    <button @click='$emit("function")' class="btn">{{ text }}</button>
</template>

<script>
export default {
    name: 'Button',
    props: {
        text: String,
        function: String,
    }
}
</script>

