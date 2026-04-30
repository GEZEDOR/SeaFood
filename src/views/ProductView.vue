<template>
    <main class="product-page container">
        <div v-if="product" class="product-wrapper">
            <div class="product-image-col">
                <div class="image-box">
                    <img
                        :src="displayImage"
                        :alt="product.title"
                        class="product-img"
                    />
                </div>
                <div v-if="hasMultipleImages" class="thumbnail-list">
                    <img
                        v-for="(img, index) in product.image"
                        :key="index"
                        :src="img"
                        :alt="`Thumbnail ${index + 1}`"
                        class="thumbnail"
                        :class="{ active: index === activeImageIndex }"
                        @click="activeImageIndex = index"
                    />
                </div>
            </div>
            <div class="product-info-col">
                <h1 class="title">{{ product.title }}</h1>
                <p class="price">${{ product.price }}</p>

                <div class="description-block">
                    <h3>Product Details</h3>
                    <p><strong>Category:</strong> {{ product.category }}</p>
                    <p>
                        <strong>Description:</strong> {{ product.description }}
                    </p>
                    <p v-if="product.ingredients">
                        <strong>Ingredients:</strong> {{ product.ingredients }}
                    </p>
                    <p v-if="product.weight">
                        <strong>Net Weight:</strong> {{ product.weight }} oz
                    </p>
                </div>

                <div class="action-buttons">
                    <div class="quantity-selector">
                        <button class="qty-btn" @click="decreaseQty">-</button>
                        <span class="qty-value">{{ quantity }}</span>
                        <button class="qty-btn" @click="increaseQty">+</button>
                    </div>
                    <button
                        class="btn btn-primary add-to-cart"
                        @click="addToCart"
                    >
                        Add to Cart
                    </button>
                </div>

                <div class="admin-actions" v-if="isAdmin">
                    <p class="admin-title">Admin Management</p>
                    <div class="admin-btns">
                        <button class="btn btn-outline" @click="openEditModal">
                            Edit Product
                        </button>
                        <button class="btn btn-danger" @click="handleDelete">
                            Delete Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="loading">
            <h2>Loading product...</h2>
        </div>

        <ItemModal
            :isOpen="isModalOpen"
            :itemToEdit="product"
            @close="closeModal"
            @submit="handleModalSubmit"
        />
    </main>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useItems } from "@/composables/useItems";
import { useNotifications } from "@/composables/useNotifications";
import { useCart } from "@/composables/useCart";
import { useAuth } from "@/composables/useAuth";
import ItemModal from "@/components/ItemModal.vue";

const route = useRoute();
const router = useRouter();
const { items, loadItems, updateItem, deleteItem } = useItems();
const { addNotification } = useNotifications();
const { addToCart: addItemToCart } = useCart();
const { isAdmin } = useAuth();

const isModalOpen = ref(false);
const quantity = ref(1);
const activeImageIndex = ref(0);

const product = computed(() => {
    return items.value.find((i) => String(i.id) === String(route.params.id));
});

const hasMultipleImages = computed(() => {
    return product.value && Array.isArray(product.value.image) && product.value.image.length > 1;
});

const displayImage = computed(() => {
    if (!product.value) return '';
    if (Array.isArray(product.value.image) && product.value.image.length > 0) {
        return product.value.image[activeImageIndex.value] || product.value.image[0];
    }
    return product.value.image || 'https://via.placeholder.com/600x600?text=No+Image';
});

onMounted(async () => {
    if (items.value.length === 0) {
        await loadItems();
    }
    if (!product.value) {
        addNotification("Product not found", "error");
        router.push("/catalog");
    }
});

const increaseQty = () => {
    quantity.value++;
};
const decreaseQty = () => {
    if (quantity.value > 1) quantity.value--;
};

const addToCart = () => {
    addItemToCart(product.value, quantity.value);
};

const openEditModal = () => {
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
};

const handleModalSubmit = async (itemData) => {
    const success = await updateItem(itemData.id, itemData);
    if (success) {
        closeModal();
    }
};

const handleDelete = async () => {
    const success = await deleteItem(product.value.id);
    if (success) {
        router.push("/catalog");
    }
};
</script>

<style scoped>
.product-page {
    padding: 60px 20px;
}

.product-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 50px;
    align-items: start;
}

@media (max-width: 768px) {
    .product-wrapper {
        grid-template-columns: 1fr;
    }
}

.image-box {
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 20px;
    background-color: var(--white);
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1 / 1;
    overflow: hidden;
}

.product-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.thumbnail-list {
    display: flex;
    gap: 10px;
    margin-top: 15px;
    overflow-x: auto;
    padding-bottom: 5px;
}

.thumbnail {
    width: 80px;
    height: 80px;
    object-fit: contain;
    background-color: var(--white);
    border-radius: 8px;
    cursor: pointer;
    border: 1px solid #eaeaea;
    padding: 5px;
    transition: all 0.2s;
}

.thumbnail:hover {
    transform: translateY(-2px);
}

.thumbnail.active {
    border: 2px solid var(--primary-color);
    padding: 4px;
}

.category {
    font-size: 0.9rem;
    color: var(--text-light);
    text-transform: uppercase;
    margin-bottom: 10px;
}

.title {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: var(--primary-color);
}

.price {
    font-size: 2rem;
    font-weight: 700;
    color: var(--primary-color);
    margin-bottom: 30px;
}

.description-block {
    margin-bottom: 40px;
    border-top: 1px solid var(--border-color);
    padding-top: 20px;
}

.description-block h3 {
    font-size: 1.2rem;
    margin-bottom: 10px;
}

.description-block p {
    color: var(--text-light);
    line-height: 1.8;
}

.action-buttons {
    margin-bottom: 40px;
    display: flex;
    gap: 15px;
}

.quantity-selector {
    display: flex;
    align-items: center;
    border: 1px solid var(--border-color);
    border-radius: 25px;
    background: var(--white);
    overflow: hidden;
}

.qty-btn {
    background: none;
    border: none;
    padding: 10px 20px;
    font-size: 1.2rem;
    cursor: pointer;
    color: var(--primary-color);
}

.qty-value {
    padding: 0 10px;
    font-weight: 600;
    min-width: 30px;
    text-align: center;
}

.add-to-cart {
    flex-grow: 1;
    padding: 15px;
    font-size: 1.1rem;
    border-radius: 25px;
}

.admin-actions {
    background: var(--bg-color);
    padding: 20px;
    border-radius: 8px;
    border: 1px dashed var(--border-color);
}

.admin-title {
    font-weight: 600;
    margin-bottom: 15px;
    color: var(--text-light);
}

.admin-btns {
    display: flex;
    gap: 15px;
}

.admin-btns button {
    flex: 1;
}

.loading {
    text-align: center;
    padding: 50px;
}
</style>
