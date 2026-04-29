import { ref } from "vue";

const notifications = ref([]);

export function useNotifications() {
    const addNotification = (message, type = "success") => {
        const id = Date.now();
        notifications.value.push({ id, message, type });
        setTimeout(() => {
            removeNotification(id);
        }, 3000);
    };

    const removeNotification = (id) => {
        notifications.value = notifications.value.filter((n) => n.id !== id);
    };

    return {
        notifications,
        addNotification,
        removeNotification,
    };
}
