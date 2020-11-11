<template>
    <div class="app">
        <h1>Hallo</h1>
    </div>
</template>

<script>
export default {
    mounted() {
        console.log(this.$route.query.q)
    }
}
</script>

<style>

</style>