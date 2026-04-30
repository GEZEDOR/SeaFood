<template>
    <AppLoader />
    <AppNotification />
    <HeaderNav />
    <div id="hero-target"></div>

    <div class="main-wrapper">
        <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>
    </div>

    <AppFooter />
</template>

<script setup>
import "@/assets/styles/main.css";
import AppLoader from "@/components/AppLoader.vue";
import AppNotification from "@/components/AppNotification.vue";
import HeaderNav from "@/components/HeaderNav.vue";
import AppFooter from "@/components/AppFooter.vue";
</script>

<style scoped>
.main-wrapper {
    min-height: calc(97vh - 84px - 200px);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(10px);
}
</style>
