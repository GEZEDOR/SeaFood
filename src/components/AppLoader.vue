<template>
    <div v-if="isLoading" class="loader-overlay">
        <div class="fish-container">
            <div class="water"></div>
            <div class="fish">🐟</div>
        </div>
    </div>
</template>

<script setup>
import { useLoader } from "@/composables/useLoader";

const { isLoading } = useLoader();
</script>

<style scoped>
.loader-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: var(--bg-color);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.fish-container {
    position: relative;
    width: 200px;
    height: 60px;
    overflow: hidden;
    border-bottom: 3px solid #6ecdf5;
}

.fish {
    font-size: 2.5rem;
    position: absolute;
    bottom: 0;
    animation: swim 500ms linear infinite;
    transform: scaleX(-1);
}

@keyframes swim {
    0% {
        transform: translateX(-50px) translateY(0) scaleX(-1);
    }
    50% {
        transform: translateX(75px) translateY(-10px) scaleX(-1);
    }
    100% {
        transform: translateX(200px) translateY(0) scaleX(-1);
    }
}
</style>
