<template>

    <div id="home">
        <h1>Hello SSR</h1>
        <h2>Count: {{count}}</h2>
        <button @click="addOne">+</button>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                count: 1
            }
        },
        methods: {
            addOne() {
                this.count++
            }
        }
    }
</script>

<style scoped>

</style>