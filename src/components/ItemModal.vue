<template>
    <div v-if="isOpen" class="modal-overlay" @click.self="close">
        <div class="modal-content">
            <div class="modal-header">
                <h2>{{ isEdit ? "Edit Product" : "Add Product" }}</h2>
                <button class="close-btn" @click="close">&times;</button>
            </div>

            <form @submit.prevent="handleSubmit" class="modal-form">
                <div class="form-group">
                    <label for="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        v-model="formData.title"
                        required
                        placeholder="e.g. Sardines with Lemon"
                    />
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="price">Price ($)</label>
                        <input
                            type="number"
                            id="price"
                            v-model="formData.price"
                            required
                            min="0"
                            step="1"
                        />
                    </div>
                    <div class="form-group">
                        <label for="category">Category</label>
                        <select
                            id="category"
                            v-model="formData.category"
                            required
                        >
                            <option value="" disabled>Select Category</option>
                            <option value="Salmon">Salmon</option>
                            <option value="Tuna">Tuna</option>
                            <option value="Trout">Trout</option>
                            <option value="Mussels">Mussels</option>
                            <option value="Mackerel">Mackerel</option>
                            <option value="Sardines">Sardines</option>
                            <option value="Anchovies">Anchovies</option>
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <label for="image">Image URL</label>
                    <input
                        type="url"
                        id="image"
                        v-model="formData.image"
                        placeholder="https://example.com/image.png"
                    />
                </div>

                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea
                        id="description"
                        v-model="formData.description"
                        rows="2"
                        required
                        placeholder="Product description..."
                    ></textarea>
                </div>

                <div class="form-group">
                    <label for="ingredients">Ingredients</label>
                    <textarea
                        id="ingredients"
                        v-model="formData.ingredients"
                        rows="2"
                        placeholder="List of ingredients..."
                    ></textarea>
                </div>

                <div class="form-group">
                    <label for="weight">Weight</label>
                    <input
                        type="text"
                        id="weight"
                        v-model="formData.weight"
                        placeholder="e.g. 3.5"
                    />
                </div>

                <div class="modal-actions">
                    <button
                        type="button"
                        class="btn btn-outline"
                        @click="close"
                    >
                        Cancel
                    </button>
                    <button type="submit" class="btn btn-primary">
                        {{ isEdit ? "Save" : "Add" }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false,
    },
    itemToEdit: {
        type: Object,
        default: null,
    },
});

const emit = defineEmits(["close", "submit"]);

const isEdit = ref(false);
const formData = ref({
    title: "",
    price: "",
    category: "",
    image: "",
    description: "",
    ingredients: "",
    weight: "",
});

watch(
    () => props.isOpen,
    (newVal) => {
        if (newVal) {
            if (props.itemToEdit) {
                isEdit.value = true;
                formData.value = { ...props.itemToEdit };
            } else {
                isEdit.value = false;
                formData.value = {
                    title: "",
                    price: "",
                    category: "",
                    image: "",
                    description: "",
                    ingredients: "",
                    weight: "",
                };
            }
        }
    },
);

const close = () => {
    emit("close");
};

const handleSubmit = () => {
    emit("submit", { ...formData.value });
};
</script>

<style scoped>
.modal-content {
    background: var(--white);
    padding: 30px;
    border-radius: 12px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.modal-header h2 {
    margin: 0;
    font-size: 1.5rem;
    color: var(--primary-color);
}

.close-btn {
    background: none;
    border: none;
    font-size: 1.8rem;
    line-height: 1;
    cursor: pointer;
    color: var(--text-light);
    transition: color 0.2s;
}

.close-btn:hover {
    color: var(--danger);
}

.form-group {
    margin-bottom: 15px;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
    color: var(--primary-color);
    font-size: 0.9rem;
}

input,
select,
textarea {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    font-family: inherit;
    font-size: 1rem;
    transition: border-color 0.3s;
}

input:focus,
select:focus,
textarea:focus {
    outline: none;
    border-color: var(--primary-color);
}

.modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 25px;
}
</style>
