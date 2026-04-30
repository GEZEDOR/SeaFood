<template>
    <footer class="footer" :class="{ 'dark-theme': isAquariumRoute }">
        <div class="container footer-content">
            <div class="logo">
                <span class="logo-icon">🐟</span>
                <span>SeaFood</span>
            </div>

            <div class="footer-center">
                <nav class="footer-nav">
                    <router-link to="/catalog">Catalog</router-link>
                    <router-link to="/about">About Us</router-link>
                    <router-link to="/contacts">Contacts</router-link>
                </nav>
                <div class="copyright">
                    &copy; 2026 SeaFood. All rights reserved.
                </div>
            </div>

            <div class="footer-social">
                <a href="#"
                    ><img
                        src="https://eatfishwife.com/cdn/shop/files/instagram-icon.png?v=1740346663&width=200"
                        alt="Instagram"
                /></a>
                <a href="#"
                    ><img
                        src="https://eatfishwife.com/cdn/shop/files/tiktok-icon.png?v=1740346663&width=200"
                        alt="TikTok"
                /></a>
                <a href="#"
                    ><img
                        src="https://eatfishwife.com/cdn/shop/files/email-icon.png?v=1741206740&width=200"
                        alt="Email"
                /></a>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const isAquariumRoute = computed(() => route.name === 'aquarium');
</script>

<style scoped>
.footer {
    background-color: var(--water);
    padding: 40px 0;
    margin-top: 80px;
}

.footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 2rem;
    font-family: var(--font-heading);
    color: var(--primary-color);
    flex: 1;
}

.logo-icon {
    font-size: 2rem;
    display: inline-block;
    transform: scaleX(-1);
}

.footer-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 2;
}

.footer-nav {
    display: flex;
    gap: 30px;
    margin-bottom: 25px;
}

.footer-nav a {
    color: var(--primary-color);
    font-family: var(--font-body);
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s;
}

.footer-nav a:hover {
    color: var(--secondary-color);
}

.copyright {
    font-size: 0.8rem;
    color: var(--text-light);
    opacity: 0.6;
    font-family: var(--font-body);
}

.footer-social {
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: flex-end;
    flex: 1;
}

.footer-social img {
    width: 40px;
    height: 40px;
    object-fit: contain;
    transition: transform 0.2s;
}

.footer-social img:hover {
    transform: scale(1.1);
}

@media (max-width: 992px) {
    .footer-content {
        flex-direction: column;
        gap: 30px;
    }

    .logo {
        justify-content: center;
    }

    .footer-social {
        justify-content: center;
    }
}

/* Dark Theme for Aquarium Page */
.footer.dark-theme {
    background-color: #08080a;
    margin-top: 0;
    border-top: 1px solid #1a1a1d;
}

.footer.dark-theme .logo,
.footer.dark-theme .footer-nav a {
    color: #ffffff;
}

.footer.dark-theme .footer-nav a:hover {
    color: var(--secondary-color);
}
</style>
