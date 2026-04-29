<template>
    <header class="header">
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
            </nav>

            <div class="header-actions">
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
import { ref, onMounted } from "vue";
import { useCart } from "@/composables/useCart";

const { cartItemsCount, loadCart, cartItems } = useCart();
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
        max-height: 300px;
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
</style>
