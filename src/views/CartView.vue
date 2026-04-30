<template>
    <main class="cart-page container">
        <div
            class="cart-layout"
            :class="{ 'empty-layout': cartItems.length === 0 }"
        >
            <div
                class="cart-items-section"
                :class="{ 'text-center': cartItems.length === 0 }"
            >
                <h2>Shopping Bag</h2>

                <div v-if="cartItems.length > 0" class="cart-items-list">
                    <div
                        v-for="item in cartItems"
                        :key="item.id"
                        class="cart-item"
                    >
                        <div class="item-image">
                            <img
                                :src="
                                    Array.isArray(item.image) && item.image.length > 0 
                                        ? item.image[0] 
                                        : (item.image || 'https://via.placeholder.com/150?text=No+Image')
                                "
                                :alt="item.title"
                            />
                        </div>

                        <div class="item-details">
                            <div class="item-header">
                                <h3>{{ item.title }}</h3>
                                <span class="item-price"
                                    >{{ item.price }} $</span
                                >
                            </div>
                            <p class="item-category">
                                Category: {{ item.category }}
                            </p>
                            <p class="item-weight" v-if="item.weight">
                                Net Weight: {{ item.weight }} oz
                            </p>

                            <div class="item-actions">
                                <div class="quantity-controls">
                                    <button
                                        class="qty-btn"
                                        @click="
                                            updateQuantity(
                                                item.id,
                                                item.quantity - 1,
                                            )
                                        "
                                    >
                                        −
                                    </button>
                                    <span class="qty-value">{{
                                        item.quantity
                                    }}</span>
                                    <button
                                        class="qty-btn"
                                        @click="
                                            updateQuantity(
                                                item.id,
                                                item.quantity + 1,
                                            )
                                        "
                                    >
                                        +
                                    </button>
                                </div>

                                <button
                                    class="remove-btn"
                                    @click="removeFromCart(item.id)"
                                    title="Remove item"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="trash-icon"
                                    >
                                        <polyline
                                            points="3 6 5 6 21 6"
                                        ></polyline>
                                        <path
                                            d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                                        ></path>
                                    </svg>
                                </button>
                            </div>

                            <div class="item-total">
                                <strong
                                    >Total:
                                    {{
                                        (item.price * item.quantity).toFixed(2)
                                    }}
                                    $</strong
                                >
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else class="empty-cart">
                    <p>Your shopping bag is empty.</p>
                    <router-link to="/catalog" class="btn btn-primary"
                        >Go to Catalog</router-link
                    >
                </div>
            </div>

            <div v-if="cartItems.length > 0" class="cart-summary-section">
                <h3>Summary</h3>

                <div class="summary-details">
                    <div class="summary-row">
                        <span>Subtotal</span>
                        <span>{{ cartTotal.toFixed(2) }} $</span>
                    </div>
                    <div class="summary-row">
                        <span>Estimated Shipping</span>
                        <span>Free</span>
                    </div>
                </div>

                <div class="summary-total">
                    <span>Total</span>
                    <span>{{ cartTotal.toFixed(2) }} $</span>
                </div>

                <button
                    class="btn btn-primary checkout-btn"
                    :disabled="cartItems.length === 0"
                    @click="handleCheckoutClick"
                >
                    Checkout
                </button>

                <p class="terms-text">
                    By clicking the button, you agree to the terms and privacy
                    policy.
                </p>

                <button
                    class="clear-cart-btn"
                    v-if="cartItems.length > 0"
                    @click="clearCart(false)"
                >
                    Clear cart
                </button>
            </div>
        </div>
    </main>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCart } from "@/composables/useCart";
import { useAuth } from "@/composables/useAuth";

const router = useRouter();
const { isAuthenticated } = useAuth();

const {
    cartItems,
    loadCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
} = useCart();

const handleCheckoutClick = () => {
    if (!isAuthenticated.value) {
        router.push({ path: "/auth", query: { redirect: "/checkout" } });
    } else {
        router.push("/checkout");
    }
};

onMounted(() => {
    if (cartItems.value.length === 0) {
        loadCart();
    }
});
</script>

<style scoped>
.cart-page {
    padding: 60px 20px;
}

.cart-layout {
    display: flex;
    gap: 60px;
    align-items: flex-start;
}

/* Left Column */
.cart-items-section {
    flex: 1;
}

.cart-items-section h2 {
    font-size: 2rem;
    margin-bottom: 30px;
    color: var(--primary-color);
}

.cart-items-section.text-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin: 0 auto;
}

.cart-items-section.text-center h2 {
    text-align: center;
}

.cart-item {
    display: flex;
    gap: 20px;
    padding: 25px 0;
    border-bottom: 1px solid var(--border-color);
}

.item-image {
    width: 185px;
    height: 185px;
    background-color: #fcfbfc;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border: solid 1px;
}

.item-image img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.item-details {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.item-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 5px;
    gap: 15px;
}

.item-header h3 {
    font-size: 1.2rem;
    margin: 0;
    color: var(--primary-color);
    max-width: 80%; /* Limit title width to give space for price */
}

.item-price {
    font-weight: 600;
    font-size: 1.1rem;
    white-space: nowrap; /* Prevent price and $ from breaking apart */
}

.item-category,
.item-weight {
    color: var(--text-light);
    font-size: 0.9rem;
    margin-bottom: 5px;
}

.item-weight {
    margin-bottom: 15px;
}

.item-actions {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: auto;
}

.quantity-controls {
    display: flex;
    align-items: center;
    border: 1px solid var(--border-color);
    border-radius: 4px;
}

.qty-btn {
    background: none;
    border: none;
    padding: 5px 12px;
    font-size: 1.2rem;
    cursor: pointer;
    color: var(--primary-color);
}

.qty-btn:hover {
    background-color: rgba(0, 0, 0, 0.05);
}

.qty-value {
    padding: 0 10px;
    font-weight: 500;
    min-width: 30px;
    text-align: center;
}

.remove-btn {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--danger);
    display: flex;
    align-items: center;
    padding: 5px;
    transition: opacity 0.2s;
}

.remove-btn:hover {
    opacity: 0.7;
}

.item-total {
    margin-top: 15px;
    font-size: 1rem;
}

.empty-cart {
    text-align: center;
    padding: 50px 0;
}

.empty-cart p {
    margin-bottom: 20px;
    color: var(--text-light);
    font-size: 1.1rem;
}

.cart-summary-section {
    width: 350px;
    position: sticky;
    top: 100px;
}

.cart-summary-section h3 {
    font-size: 2rem;
    margin-bottom: 25px;
    color: var(--primary-color);
}

.summary-details {
    border-bottom: 2px solid var(--border-color);
    padding-bottom: 15px;
    margin-bottom: 15px;
}

.summary-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    font-size: 0.95rem;
    color: var(--text-color);
}

.summary-total {
    display: flex;
    justify-content: space-between;
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 25px;
    color: var(--primary-color);
}

.checkout-btn {
    width: 100%;
    padding: 15px;
    border: solid 1px var(--border-color);
    border-radius: 50px;
    font-size: 1.1rem;
    margin-bottom: 15px;
}

.terms-text {
    font-size: 0.8rem;
    color: var(--text-light);
    text-align: center;
    margin-bottom: 25px;
    line-height: 1.4;
}

.clear-cart-btn {
    width: 100%;
    padding: 12px;
    background-color: var(--white);
    color: black;
    border: solid 1px var(--border-color);
    border-radius: 50px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;
}

.clear-cart-btn:hover {
    background-color: var(--secondary-color);
}

@media (max-width: 992px) {
    .cart-layout {
        flex-direction: column;
        align-items: stretch;
    }

    .cart-items-section {
        width: 100%;
    }

    .cart-summary-section {
        width: 100%;
        position: static;
        margin-top: 40px;
    }

    .empty-layout {
        justify-content: center;
    }
}

@media (max-width: 576px) {
    .cart-items-section h2 {
        text-align: center;
    }

    .cart-item {
        flex-direction: column;
        align-items: stretch;
    }

    .item-image {
        width: 100%;
        height: 250px;
    }

    .item-details {
        width: 100%;
    }
}
</style>
