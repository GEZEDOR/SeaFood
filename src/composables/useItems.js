import { ref, computed } from "vue";
import axios from "axios";
import { useLoader } from "./useLoader";
import { useNotifications } from "./useNotifications";
import { useCart } from "./useCart";

const items = ref([]);
const API_URL = import.meta.env.VITE_API_PRODUCTS;

export function useItems() {
    const { showLoader, hideLoader } = useLoader();
    const { addNotification } = useNotifications();

    const loadItems = async () => {
        showLoader();
        try {
            const res = await axios.get(API_URL);
            items.value = res.data;
        } catch (error) {
            console.error(error);
            addNotification("Failed to load products.", "error");
        } finally {
            hideLoader();
        }
    };

    const addItem = async (itemData) => {
        showLoader();
        try {
            const res = await axios.post(API_URL, itemData);
            items.value.push(res.data);
            addNotification("Product added successfully!", "success");
            return true;
        } catch (error) {
            console.error(error);
            addNotification("Failed to add product.", "error");
            return false;
        } finally {
            hideLoader();
        }
    };

    const updateItem = async (id, updatedData) => {
        showLoader();
        try {
            const res = await axios.put(`${API_URL}/${id}`, updatedData);
            const index = items.value.findIndex((i) => i.id === id);
            if (index !== -1) {
                items.value[index] = res.data;
            }
            addNotification("Product updated successfully!", "success");
            return true;
        } catch (error) {
            console.error(error);
            addNotification("Failed to update product.", "error");
            return false;
        } finally {
            hideLoader();
        }
    };

    const deleteItem = async (id) => {
        showLoader();
        try {
            await axios.delete(`${API_URL}/${id}`);
            items.value = items.value.filter((i) => i.id !== id);
            
            const { cartItems, removeFromCart } = useCart();
            const cartItem = cartItems.value.find(c => c.productId === id);
            if (cartItem) {
                removeFromCart(cartItem.id);
            }
            
            addNotification("Product deleted successfully!", "success");
            return true;
        } catch (error) {
            console.error(error);
            addNotification("Failed to delete product.", "error");
            return false;
        } finally {
            hideLoader();
        }
    };

    const totalCount = computed(() => items.value.length);

    return {
        items,
        loadItems,
        addItem,
        updateItem,
        deleteItem,
        totalCount,
    };
}
