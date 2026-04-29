<template>
    <div class="item-card" @click="goToProduct">
        <div class="card-image-wrapper">
            <img
                :src="
                    item.image ||
                    'https://via.placeholder.com/300x200?text=No+Image'
                "
                :alt="item.title"
            />
        </div>
        <div class="card-content">
            <h3 class="title">{{ item.title }}</h3>
        </div>
        <div class="card-action">
            <button
                class="btn btn-secondary quick-add-btn"
                @click.stop="addToCartAction"
            >
                Quick Add ${{ item.price }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useCart } from "@/composables/useCart";

const props = defineProps({
    item: {
        type: Object,
        required: true,
    },
});

const router = useRouter();
const { addToCart } = useCart();

const goToProduct = () => {
    router.push(`/product/${props.item.id}`);
};

const addToCartAction = () => {
    addToCart(props.item, 1);
};
</script>

<style scoped>
.item-card {
    background: var(--bg-color);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    height: 100%;
}

.card-image-wrapper {
    background: #fcfbfc;
    border-bottom: 1px solid var(--border-color);
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.card-image-wrapper img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.card-content {
    padding: 20px 15px;
    text-align: center;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}

.title {
    font-size: 1.3rem;
    font-family: var(--font-body);
    color: var(--primary-color);
    font-weight: 700;
    margin: 0;
    line-height: 1.3;
}

.card-action {
    width: 100%;
}

.quick-add-btn {
    width: 100%;
    border-radius: 0;
    border-top: 1px solid var(--border-color);
    padding: 15px;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--primary-color);
    transition: background-color 0.2s;
}

.item-card:hover .quick-add-btn {
    background-color: #ffbb33;
}
</style>
