import { ref, computed } from "vue";
import axios from "axios";
import { useLoader } from "./useLoader";
import { useNotifications } from "./useNotifications";

const cartItems = ref([]);
const API_URL = "https://69ed62afaf4ff533142bbbbd.mockapi.io/api/v1/Cart";

export function useCart() {
    const { showLoader, hideLoader } = useLoader();
    const { addNotification } = useNotifications();

    const loadCart = async () => {
        showLoader();
        try {
            const res = await axios.get(API_URL);
            cartItems.value = res.data;
        } catch (error) {
            console.error("Error loading cart", error);
        } finally {
            hideLoader();
        }
    };

    const addToCart = async (product, quantity = 1) => {
        showLoader();
        try {
            const existingItem = cartItems.value.find(
                (item) => item.productId === product.id,
            );
            if (existingItem) {
                const newQuantity = existingItem.quantity + quantity;
                const res = await axios.put(`${API_URL}/${existingItem.id}`, {
                    quantity: newQuantity,
                });
                existingItem.quantity = res.data.quantity;
            } else {
                const newItem = {
                    productId: product.id,
                    title: product.title,
                    price: product.price,
                    category: product.category,
                    image: product.image,
                    quantity: quantity,
                    weight: product.weight,
                };
                const res = await axios.post(API_URL, newItem);
                cartItems.value.push(res.data);
            }
            addNotification("Added to cart!", "success");
        } catch (error) {
            console.error("Error adding to cart", error);
            addNotification("Failed to add to cart", "error");
        } finally {
            hideLoader();
        }
    };

    const updateQuantity = async (cartItemId, newQuantity) => {
        if (newQuantity < 1) {
            return removeFromCart(cartItemId);
        }

        try {
            const res = await axios.put(`${API_URL}/${cartItemId}`, {
                quantity: newQuantity,
            });
            const item = cartItems.value.find((item) => item.id === cartItemId);
            if (item) {
                item.quantity = res.data.quantity;
            }
        } catch (error) {
            console.error("Error updating quantity", error);
            addNotification("Failed to update quantity", "error");
        }
    };

    const removeFromCart = async (cartItemId) => {
        try {
            await axios.delete(`${API_URL}/${cartItemId}`);
            cartItems.value = cartItems.value.filter(
                (item) => item.id !== cartItemId,
            );
            addNotification("Item removed from cart", "success");
        } catch (error) {
            console.error("Error removing from cart", error);
            addNotification("Failed to remove item", "error");
        }
    };

    const clearCart = async (isCheckout = false) => {
        if (cartItems.value.length === 0) return;

        showLoader();
        try {
            for (const item of cartItems.value) {
                await axios.delete(`${API_URL}/${item.id}`);
            }
            cartItems.value = [];

            if (isCheckout) {
                addNotification("Purchase successful! Thank you.", "success");
            } else {
                addNotification("Cart cleared successfully", "success");
            }
        } catch (error) {
            console.error("Error clearing cart", error);
            addNotification("Failed to clear cart", "error");
        } finally {
            hideLoader();
        }
    };

    const cartTotal = computed(() => {
        return cartItems.value.reduce(
            (total, item) => total + item.price * item.quantity,
            0,
        );
    });

    const cartItemsCount = computed(() => {
        return cartItems.value.reduce(
            (count, item) => count + item.quantity,
            0,
        );
    });

    return {
        cartItems,
        loadCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        cartItemsCount,
    };
}
