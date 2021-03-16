<template>
    <button @click="$emit('generate-url')" :style="{background: color}" class="btn">{{ text }}</button>
</template>

<script>
export default {
    name: 'Button',
    props: {
        text: String,
        color: String,
    }
}
</script>

