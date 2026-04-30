import { ref, computed } from "vue";
import { storage, STORAGE_KEYS } from "@/services/storage";
import { useNotifications } from "./useNotifications";

const cartItems = ref([]);

export function useCart() {
    const { addNotification } = useNotifications();

    const loadCart = async () => {
        const data = storage.get(STORAGE_KEYS.CART_ITEMS) || [];
        cartItems.value = data;
    };

    const saveCart = () => {
        storage.save(STORAGE_KEYS.CART_ITEMS, cartItems.value);
    };

    const addToCart = async (product, quantity = 1) => {
        const existingItem = cartItems.value.find(
            (item) => item.productId === product.id,
        );
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            const newItem = {
                id: Date.now().toString(), // simulate MockAPI ID
                productId: product.id,
                title: product.title,
                price: product.price,
                category: product.category,
                image: product.image,
                quantity: quantity,
                weight: product.weight,
            };
            cartItems.value.push(newItem);
        }
        
        saveCart();
        addNotification("Added to cart!", "success");
    };

    const updateQuantity = async (cartItemId, newQuantity) => {
        if (newQuantity < 1) {
            return removeFromCart(cartItemId);
        }

        const item = cartItems.value.find((item) => item.id === cartItemId);
        if (item) {
            item.quantity = newQuantity;
            saveCart();
        }
    };

    const removeFromCart = async (cartItemId) => {
        cartItems.value = cartItems.value.filter(
            (item) => item.id !== cartItemId,
        );
        saveCart();
        addNotification("Item removed from cart", "success");
    };

    const clearCart = async (isCheckout = false) => {
        if (cartItems.value.length === 0) return;

        cartItems.value = [];
        saveCart();

        if (isCheckout) {
            addNotification("Purchase successful! Thank you.", "success");
        } else {
            addNotification("Cart cleared successfully", "success");
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
