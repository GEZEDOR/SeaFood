<template>
    <div class="notifications-container">
        <div
            v-for="notif in notifications"
            :key="notif.id"
            class="notification"
            :class="notif.type"
        >
            {{ notif.message }}
        </div>
    </div>
</template>

<script setup>
import { useNotifications } from "@/composables/useNotifications";

const { notifications } = useNotifications();
</script>

<style scoped>
.notifications-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    z-index: 10000;
}

.notification {
    background-color: var(--white);
    padding: 15px 25px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    font-weight: 500;
    animation: slideIn 0.3s ease-out forwards;
    border-left: 5px solid var(--secondary-color);
}

.notification.success {
    border-left-color: var(--success);
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}
</style>
