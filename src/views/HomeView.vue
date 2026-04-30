<template>
    <main class="home">
        <Teleport to="#hero-target">
            <section class="hero">
                <div class="container hero-container">
                    <div class="hero-left">
                        <div class="hero-card">
                            <h1>
                                Just Dropped: The Fishwife <br />x<br />
                                Block Shop Bandana
                            </h1>
                            <button
                                class="hero-btn"
                                @click="$router.push('/catalog')"
                            >
                                SHOP SEAFOOD
                            </button>
                        </div>
                    </div>
                </div>
                <img class="hero-mobile-img" src="https://eatfishwife.com/cdn/shop/files/DESKTOP_BANNER_7.png?v=1775569153&width=2000" alt="Fishwife Bandana" />
            </section>
        </Teleport>

        <section id="catalog" class="catalog-section container">
            <div class="section-header">
                <h2>Featured Products</h2>
                <button
                    class="btn btn-outline"
                    @click="$router.push('/catalog')"
                >
                    View all products
                </button>
            </div>

            <div v-if="featuredItems.length > 0" class="products-grid">
                <ItemCard
                    v-for="item in featuredItems"
                    :key="item.id"
                    :item="item"
                />
            </div>
            <div v-else class="empty-state">
                <p>Loading products...</p>
            </div>
        </section>

        <section class="features">
            <div class="container features-container">
                <h2 class="features-title">
                    Hello Delicious & Nutritious Meals
                </h2>
                <div class="features-grid">
                    <div class="feature-item">
                        <img
                            src="https://eatfishwife.com/cdn/shop/files/FishwifeStickerSheetNew-07.png?v=1767376138&width=400"
                            alt="On-the-go"
                        />
                        <h3 class="feature-subtitle">On-the-go</h3>
                        <p class="feature-text">
                            Perfect for easy salads, bowls, and sandwiches
                        </p>
                    </div>
                    <div class="feature-item">
                        <img
                            src="https://eatfishwife.com/cdn/shop/files/plate.png?v=1746453377&width=400"
                            alt="Protein Packed"
                        />
                        <h3 class="feature-subtitle">Protein Packed</h3>
                        <p class="feature-text">
                            13-19 grams of protein per serving
                        </p>
                    </div>
                    <div class="feature-item">
                        <img
                            src="https://eatfishwife.com/cdn/shop/files/herbs_etc.svg?v=1755123326&width=400"
                            alt="Clean Ingredients"
                        />
                        <h3 class="feature-subtitle">Clean Ingredients</h3>
                        <p class="feature-text">
                            We use clean ingredients that you'd find in your
                            kitchen
                        </p>
                    </div>
                    <div class="feature-item">
                        <img
                            src="https://eatfishwife.com/cdn/shop/files/lil_boat.svg?v=1749676982&width=400"
                            alt="Sustainably Sourced"
                        />
                        <h3 class="feature-subtitle">Sustainably Sourced</h3>
                        <p class="feature-text">
                            We work with responsibly managed farms and healthy
                            fisheries
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section class="sign-up">
            <div class="sign-up-line-container">
                <div class="sign-up-line"></div>
                <div class="sign-up-circle-wrapper">
                    <div class="sign-up-circle">
                        <img
                            src="https://eatfishwife.com/cdn/shop/files/fishwife-lady.png?v=1741039983&width=200"
                            alt="Fishwife Lady"
                        />
                    </div>
                </div>
            </div>
            <div class="container sign-up-container">
                <p class="sign-up-text">
                    Sign up for the latest updates, product launches, and fresh
                    collaborations.
                </p>
                <form class="sign-up-form" @submit.prevent="handleSubscribe">
                    <input
                        type="email"
                        v-model="email"
                        placeholder="Your email*"
                        required
                        class="sign-up-input"
                    />
                    <button type="submit" class="sign-up-btn">Subscribe</button>
                </form>
            </div>
        </section>
    </main>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useItems } from "@/composables/useItems";
import { useNotifications } from "@/composables/useNotifications";
import ItemCard from "@/components/ItemCard.vue";

const { items, loadItems } = useItems();
const { addNotification } = useNotifications();
const router = useRouter();

const email = ref("");

const handleSubscribe = () => {
    if (email.value) {
        addNotification("Thank you! Info was sent to your email.", "success");
        email.value = "";
    }
};

const featuredItems = computed(() => {
    if (!items.value.length) return [];
    const categories = new Set();
    const featured = [];
    for (const item of items.value) {
        if (!categories.has(item.category)) {
            categories.add(item.category);
            featured.push(item);
        }
        if (featured.length === 4) break;
    }
    if (featured.length < 4) {
        for (const item of items.value) {
            if (!featured.find((f) => f.id === item.id)) {
                featured.push(item);
            }
            if (featured.length === 4) break;
        }
    }
    return featured;
});

onMounted(() => {
    if (items.value.length === 0) {
        loadItems();
    }
});
</script>

<style scoped>
.hero {
    min-height: calc(100vh - 84px);
    background-color: var(--bg-color);
    background-image: url("https://eatfishwife.com/cdn/shop/files/DESKTOP_BANNER_7.png?v=1775569153&width=2000");
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--border-color);
}

.hero-container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
}

.hero-left {
    flex: 0 0 50%;
    display: flex;
    justify-content: flex-start;
}

.hero-card {
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 3rem 2.5rem;
    background-color: #faefdb;
    max-width: 440px;
}

.hero-card h1 {
    font-family: var(--font-heading);
    font-size: 3.2rem;
    color: var(--primary-color);
    line-height: 1.1;
    margin-bottom: 2.5rem;
    font-weight: 500;
}

.hero-mobile-img {
    display: none;
}

.hero-btn {
    width: 100%;
    padding: 1rem;
    background-color: var(--secondary-color);
    color: var(--primary-color);
    border: 1px solid var(--border-color);
    border-radius: 50px;
    font-family: var(--font-body);
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    text-transform: uppercase;
    transition: background-color 0.2s;
}

.hero-btn:hover {
    background-color: var(--accent-color);
}

.catalog-section {
    padding: 80px 20px;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
    flex-wrap: wrap;
    gap: 20px;
}

.section-header h2 {
    margin: 0;
    text-align: left;
}

.products-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
}

@media (max-width: 1024px) {
    .products-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 768px) {
    .products-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 480px) {
    .products-grid {
        grid-template-columns: 1fr;
    }
}

.empty-state {
    text-align: center;
    padding: 50px;
}

.features {
    background-color: var(--white);
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
    padding: 5rem 0;
    color: var(--text-color);
}

.features-title {
    font-size: clamp(2rem, 3vw, 2.5rem);
    text-align: center;
    margin-bottom: 4rem;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    text-align: center;
}

.feature-item {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.feature-item img {
    height: 100px;
    width: auto;
    object-fit: contain;
    margin-bottom: 1.5rem;
}

.feature-subtitle {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
}

.feature-text {
    font-family: var(--font-body);
    font-size: 0.9375rem;
    color: var(--text-light);
    line-height: 1.6;
    max-width: 260px;
    margin: 0 auto;
}

/* Features Responsiveness */
@media (max-width: 992px) {
    .features-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 3rem 2rem;
    }
    .hero {
        background-position: 80% center;
    }
    .hero-card {
        padding: 2.5rem 1.5rem;
        background-color: #faefdb;
        text-align: center;
    }
    .hero-card h1 {
        font-size: 2.8rem;
    }
}

@media (max-width: 768px) {
    .hero {
        background-image: none;
        flex-direction: column;
        padding-top: 3rem;
        min-height: auto;
    }
    .hero-container {
        justify-content: center;
        margin-bottom: 2rem;
    }
    .hero-left {
        flex: 1 1 100%;
        justify-content: center;
        width: 100%;
        margin-top: 0;
    }
    .hero-card {
        width: 100%;
        max-width: 90%;
        margin: 0 auto;
        box-shadow: none;
    }
    .hero-mobile-img {
        display: block;
        width: 100%;
        height: 450px;
        object-fit: cover;
        object-position: 85% center;
    }
}

@media (max-width: 576px) {
    .features-grid {
        grid-template-columns: 1fr;
    }
    .hero-card h1 {
        font-size: 2.2rem;
        margin-bottom: 1.5rem;
    }
    .hero-mobile-img {
        height: 400px;
        object-position: 85% center;
    }
}

.sign-up {
    background-color: var(--bg-color);
    padding-bottom: 5rem;
}

.sign-up-line-container {
    position: relative;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
    margin-top: 1rem;
}

.sign-up-line {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #000;
    z-index: 1;
}

.sign-up-circle-wrapper {
    position: relative;
    z-index: 2;
    background-color: var(--bg-color);
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.sign-up-circle {
    width: 70px;
    height: 70px;
    background-color: #fdcd62;
    border: 1px solid #000;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.sign-up-circle img {
    width: 85%;
    height: 85%;
    object-fit: contain;
}

.sign-up-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.sign-up-text {
    font-family: var(--font-heading);
    font-size: 1.5rem;
    color: #000;
    margin-bottom: 1.5rem;
}

.sign-up-form {
    display: flex;
    gap: 0.5rem;
    width: 100%;
    max-width: 500px;
}

.sign-up-input {
    flex: 1;
    padding: 0.6rem 1.25rem;
    border: 1px solid #000;
    border-radius: 50px;
    font-family: var(--font-body);
    font-size: 0.9rem;
    background-color: var(--bg-color);
    outline: none;
    color: #000;
}

.sign-up-input::placeholder {
    color: #666;
}

.sign-up-btn {
    padding: 0.6rem 1.5rem;
    border: 1px solid #000;
    border-radius: 50px;
    background-color: #fdcd62;
    color: #000;
    font-family: var(--font-body);
    font-size: 0.9rem;
    cursor: pointer;
    transition: background-color 0.2s;
}

.sign-up-btn:hover {
    background-color: #fce88e;
}

@media (max-width: 576px) {
    .sign-up-form {
        flex-direction: column;
        max-width: 300px;
        margin: 0 auto;
    }
}
</style>
