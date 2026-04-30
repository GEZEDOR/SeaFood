<template>
    <main class="checkout-page container">
        <h1>Checkout</h1>
        
        <div v-if="cartItems.length === 0" class="empty-state">
            <p>Your cart is empty. Please add items to cart before checkout.</p>
            <router-link to="/catalog" class="btn btn-primary">Go to Catalog</router-link>
        </div>

        <div v-else class="checkout-grid">
            <div class="checkout-form">
                <h2>Shipping Information</h2>
                <form @submit.prevent="handleCheckout">
                    <div class="form-group">
                        <label for="fullName">Full Name</label>
                        <input type="text" id="fullName" v-model="form.fullName" required placeholder="John Doe" />
                    </div>

                    <div class="form-group">
                        <label for="phone">Phone Number</label>
                        <input type="tel" id="phone" v-model="form.phone" required placeholder="+1 234 567 8900" />
                    </div>

                    <div class="form-group">
                        <label for="address">Delivery Address</label>
                        <textarea id="address" v-model="form.address" rows="3" required placeholder="123 Ocean Drive, Apt 4..."></textarea>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="city">City</label>
                            <input type="text" id="city" v-model="form.city" required />
                        </div>
                        <div class="form-group">
                            <label for="zip">ZIP Code</label>
                            <input type="text" id="zip" v-model="form.zip" required />
                        </div>
                    </div>

                    <div class="payment-section">
                        <h2>Payment Method</h2>
                        <div class="payment-options">
                            <label class="radio-label" :class="{ active: form.payment === 'card' }">
                                <input type="radio" v-model="form.payment" value="card" /> Credit Card
                            </label>
                            <label class="radio-label" :class="{ active: form.payment === 'cash' }">
                                <input type="radio" v-model="form.payment" value="cash" /> Cash on Delivery
                            </label>
                        </div>
                        
                        <div v-if="form.payment === 'card'" class="card-details">
                            <div class="form-group">
                                <label for="cardNumber">Card Number</label>
                                <input type="text" id="cardNumber" v-model="form.cardNumber" @input="formatCardNumber" placeholder="0000 0000 0000 0000" maxlength="19" pattern="\d{4} \d{4} \d{4} \d{4}" title="16-digit card number" required />
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="expDate">Expiry Date (MM/YY)</label>
                                    <input type="text" id="expDate" v-model="form.expDate" @input="formatExpDate" placeholder="12/25" maxlength="5" pattern="(0[1-9]|1[0-2])\/[0-9]{2}" title="Must be MM/YY format (e.g. 12/25)" required />
                                </div>
                                <div class="form-group">
                                    <label for="cvc">CVC</label>
                                    <input type="text" id="cvc" v-model="form.cvc" @input="formatCVC" placeholder="123" maxlength="3" pattern="\d{3}" title="3-digit CVC code" required />
                                </div>
                            </div>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-primary submit-btn">
                        Complete Purchase (${{ cartTotal }})
                    </button>
                </form>
            </div>

            <div class="order-summary">
                <h2>Order Summary</h2>
                <div class="summary-items">
                    <div v-for="item in cartItems" :key="item.id" class="summary-item">
                        <span class="item-title">{{ item.quantity }}x {{ item.title }}</span>
                        <span class="item-price">${{ item.price * item.quantity }}</span>
                    </div>
                </div>
                <div class="summary-total">
                    <span>Total:</span>
                    <span>${{ cartTotal }}</span>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useCart } from '@/composables/useCart';
import { useAuth } from '@/composables/useAuth';

const router = useRouter();
const { cartItems, cartTotal, loadCart, clearCart } = useCart();
const { currentUser, isAuthenticated } = useAuth();

const form = ref({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    payment: 'card',
    cardNumber: '',
    expDate: '',
    cvc: ''
});

onMounted(() => {
    if (!isAuthenticated.value) {
        router.push('/auth?redirect=/checkout');
        return;
    }
    loadCart();
    if (isAuthenticated.value && currentUser.value) {
        form.value.fullName = currentUser.value.name || '';
    }
});

watch(isAuthenticated, (newVal) => {
    if (!newVal) {
        router.push('/auth?redirect=/checkout');
    }
});

const handleCheckout = () => {
    if (!isAuthenticated.value) {
        router.push('/auth?redirect=/checkout');
        return;
    }
    // Simulate API call for checkout
    setTimeout(() => {
        clearCart(true); // true means it's a checkout clear
        router.push('/');
    }, 1000);
};

const formatCardNumber = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove all non-digits
    let formattedValue = '';
    for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formattedValue += ' ';
        }
        formattedValue += value[i];
    }
    form.value.cardNumber = formattedValue;
};

const formatExpDate = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    form.value.expDate = value;
};

const formatCVC = (e) => {
    form.value.cvc = e.target.value.replace(/\D/g, '').substring(0, 3);
};
</script>

<style scoped>
.checkout-page {
    padding: 60px 20px;
}

h1 {
    margin-bottom: 40px;
    color: var(--primary-color);
}

.checkout-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 40px;
    align-items: start;
}

@media (max-width: 900px) {
    .checkout-grid {
        grid-template-columns: 1fr;
    }
}

.checkout-form, .order-summary {
    background: var(--white);
    padding: 30px;
    border-radius: 12px;
    border: 1px solid var(--border-color);
}

h2 {
    font-size: 1.5rem;
    margin-bottom: 20px;
    color: var(--primary-color);
    text-align: left;
}

.form-group {
    margin-bottom: 20px;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: var(--text-light);
}

input, textarea {
    width: 100%;
    padding: 12px 15px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    font-family: inherit;
    font-size: 1rem;
    transition: border-color 0.3s;
}

input:focus, textarea:focus {
    outline: none;
    border-color: var(--primary-color);
}

.payment-section {
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid var(--border-color);
}

.card-details {
    margin-top: 20px;
    padding: 20px;
    background: #fdfdfd;
    border: 1px solid #eaeaea;
    border-radius: 8px;
}

.payment-options {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
}

.radio-label {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-weight: 500;
    white-space: nowrap;
    padding: 15px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    transition: all 0.2s;
    background: var(--white);
}

.radio-label input[type="radio"] {
    display: none;
}

.radio-label:hover {
    background: #fdfdfd;
    border-color: #666;
}

.radio-label.active {
    border-color: var(--primary-color);
    background: #fdf5e6;
    box-shadow: 0 0 0 1px var(--primary-color);
}

.submit-btn {
    width: 100%;
    padding: 15px;
    font-size: 1.2rem;
}

.summary-items {
    margin-bottom: 20px;
}

.summary-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    color: var(--text-color);
}

.summary-total {
    display: flex;
    justify-content: space-between;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary-color);
    padding-top: 20px;
    border-top: 1px solid var(--border-color);
}

.empty-state {
    text-align: center;
    padding: 50px;
    background: var(--white);
    border-radius: 12px;
}

.empty-state p {
    margin-bottom: 20px;
    font-size: 1.2rem;
}
</style>
