<template>
    <AppLoader />
    <AppNotification />
    <HeaderNav />
    <div id="hero-target"></div>

    <div class="main-wrapper">
        <router-view />
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
</style>
