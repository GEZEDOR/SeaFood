<template>
    <header class="header" :class="{ 'dark-theme': isAquariumRoute }">
        <div class="container header-content">
            <router-link to="/" class="logo">
                <span class="logo-icon">🐟</span>
                <span>SeaFood</span>
            </router-link>
            <nav class="nav" :class="{ 'nav-open': isMenuOpen }">
                <router-link
                    to="/"
                    class="nav-link"
                    active-class="active"
                    @click="isMenuOpen = false"
                    >Home</router-link
                >
                <router-link
                    to="/catalog"
                    class="nav-link"
                    active-class="active"
                    @click="isMenuOpen = false"
                    >Catalog</router-link
                >
                <router-link
                    to="/about"
                    class="nav-link"
                    active-class="active"
                    @click="isMenuOpen = false"
                    >About Us</router-link
                >
                <router-link
                    to="/contacts"
                    class="nav-link"
                    active-class="active"
                    @click="isMenuOpen = false"
                    >Contacts</router-link
                >
                <router-link
                    to="/aquarium"
                    class="nav-link"
                    active-class="active"
                    @click="isMenuOpen = false"
                    >Aquarium</router-link
                >
            </nav>

            <div class="header-actions">
                <router-link v-if="!isAuthenticated" to="/auth" class="auth-link">Login</router-link>
                <div v-else class="user-menu">
                    <span class="user-name">{{ currentUser.name }}</span>
                    <button @click="logout" class="logout-btn" title="Logout">🚪</button>
                </div>

                <router-link to="/cart" class="cart-icon" title="Cart">
                    🛒
                    <span v-if="cartItemsCount > 0" class="cart-badge">{{
                        cartItemsCount
                    }}</span>
                </router-link>
                <button class="burger-btn" @click="isMenuOpen = !isMenuOpen">
                    <span v-if="!isMenuOpen">☰</span>
                    <span v-else>✕</span>
                </button>
            </div>
        </div>
    </header>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useCart } from "@/composables/useCart";
import { useAuth } from "@/composables/useAuth";

const route = useRoute();
const isAquariumRoute = computed(() => route.name === 'aquarium');

const { cartItemsCount, loadCart, cartItems } = useCart();
const { isAuthenticated, currentUser, logout } = useAuth();
const isMenuOpen = ref(false);

onMounted(() => {
    if (cartItems.value.length === 0) {
        loadCart();
    }
});
</script>

<style scoped>
.header {
    background-color: var(--bg-color);
    border-bottom: 1px solid var(--border-color);
    position: sticky;
    top: 0;
    z-index: 100;
}

.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
}

.logo {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: Lobster, sans-serif;
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--primary-color);
}

.logo-icon {
    font-size: 2rem;
    display: inline-block;
    transform: scaleX(-1);
}

.nav {
    display: flex;
    gap: 30px;
    align-items: center;
}

.nav-link {
    font-family: var(--font-body);
    font-weight: 500;
    color: var(--text-color);
}

.nav-link:hover {
    color: var(--secondary-color);
}

.nav-link.active {
    font-weight: 700;
    color: var(--secondary-color);
}

.header-actions {
    display: flex;
    align-items: center;
    gap: 20px;
}

.cart-icon {
    font-size: 1.5rem;
    cursor: pointer;
    position: relative;
    display: inline-block;
}

.cart-badge {
    position: absolute;
    top: -5px;
    right: -10px;
    background-color: var(--secondary-color);
    color: var(--white);
    font-size: 0.7rem;
    font-weight: bold;
    padding: 2px 6px;
    border-radius: 10px;
    font-family: var(--font-body);
}

.auth-link {
    font-weight: 600;
    color: var(--primary-color);
}

.auth-link:hover {
    color: var(--secondary-color);
}

.user-menu {
    display: flex;
    align-items: center;
    gap: 10px;
}

.user-name {
    font-weight: 500;
    color: var(--primary-color);
}

.logout-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    padding: 0;
}

.burger-btn {
    display: none;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--primary-color);
}

@media (max-width: 768px) {
    .burger-btn {
        display: block;
    }

    .nav {
        position: absolute;
        top: 80px;
        left: 0;
        width: 100%;
        background-color: var(--bg-color);
        flex-direction: column;
        align-items: center;
        padding: 0;
        max-height: 0;
        overflow: hidden;
        transition:
            max-height 0.3s ease-in-out,
            padding 0.3s ease-in-out;
        border-bottom: 0 solid var(--border-color);
    }

    .nav.nav-open {
        max-height: 400px;
        padding: 20px 0;
        border-bottom: 1px solid var(--border-color);
    }

    .nav-link {
        font-size: 1.1rem;
        padding: 10px 0;
        width: 100%;
        text-align: center;
    }
}

/* Dark Theme for Aquarium Page */
.header.dark-theme {
    background-color: #08080a;
    border-bottom: 1px solid #1a1a1d;
}

.header.dark-theme .logo,
.header.dark-theme .nav-link,
.header.dark-theme .user-name {
    color: #ffffff;
}

.header.dark-theme .nav-link:hover,
.header.dark-theme .nav-link.active,
.header.dark-theme .auth-link {
    color: var(--secondary-color);
}

.header.dark-theme .cart-icon,
.header.dark-theme .logout-btn {
    color: #ffffff;
}

.header.dark-theme .burger-btn {
    color: #ffffff;
}

@media (max-width: 768px) {
    .header.dark-theme .nav {
        background-color: #08080a;
        border-bottom-color: #1a1a1d;
    }

    .header.dark-theme .nav-link {
        color: #ffffff;
    }

    .header.dark-theme .nav-link:hover,
    .header.dark-theme .nav-link.active {
        color: var(--secondary-color);
    }
}
</style>
