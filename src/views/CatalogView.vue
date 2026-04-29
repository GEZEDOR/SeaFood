<template>
    <main class="catalog-page container">
        <div class="catalog-header">
            <h2>Featured Products</h2>
            <button class="btn btn-secondary" @click="openCreateModal">
                + Add Product
            </button>
        </div>

        <div class="filters-container">
            <button
                v-for="cat in categories"
                :key="cat"
                class="filter-btn"
                :class="{ active: activeFilter === cat }"
                @click="toggleFilter(cat)"
            >
                {{ cat }}
            </button>
        </div>

        <div v-if="filteredItems.length > 0" class="products-grid">
            <ItemCard
                v-for="item in filteredItems"
                :key="item.id"
                :item="item"
            />
        </div>
        <div v-else class="empty-state">
            <p v-if="items.length === 0">Loading products...</p>
            <p v-else>No products found in this category.</p>
        </div>

        <ItemModal
            :isOpen="isModalOpen"
            @close="closeModal"
            @submit="handleModalSubmit"
        />
    </main>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useItems } from "@/composables/useItems";
import ItemCard from "@/components/ItemCard.vue";
import ItemModal from "@/components/ItemModal.vue";

const { items, loadItems, addItem } = useItems();
const isModalOpen = ref(false);

const categories = [
    "Salmon",
    "Tuna",
    "Trout",
    "Mussels",
    "Mackerel",
    "Sardines",
    "Anchovies",
];
const activeFilter = ref("");

const toggleFilter = (category) => {
    if (activeFilter.value === category) {
        activeFilter.value = "";
    } else {
        activeFilter.value = category;
    }
};

const filteredItems = computed(() => {
    if (!activeFilter.value) return items.value;
    return items.value.filter((item) => item.category === activeFilter.value);
});

onMounted(() => {
    if (items.value.length === 0) {
        loadItems();
    }
});

const openCreateModal = () => {
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
};

const handleModalSubmit = async (itemData) => {
    const success = await addItem(itemData);
    if (success) {
        closeModal();
    }
};
</script>

<style scoped>
.catalog-page {
    padding: 60px 20px;
}

.catalog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.filters-container {
    display: flex;
    justify-content: center;
    gap: 15px;
    flex-wrap: wrap;
    margin-bottom: 40px;
}

.filter-btn {
    background-color: var(--bg-color);
    border: 1px solid var(--border-color);
    color: var(--primary-color);
    padding: 8px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-family: var(--font-body);
    font-size: 0.95rem;
    transition: background-color 0.2s;
}

.filter-btn.active {
    background-color: var(--secondary-color);
    font-weight: 600;
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
</style>
