<template>
    <div class="full-space">
        <h1>{{ message }}</h1>
        <button @click="updateMessage">Click me</button>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
    data() {
        return {
            message: 'Hello, World!'
        };
    },
    methods: {
        updateMessage() {
            this.message = 'Message updated!';
        }
    }
});
</script>

<style scoped>
.full-space {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>