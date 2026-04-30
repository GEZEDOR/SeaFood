import { ref, computed } from "vue";
import axios from "axios";
import { useLoader } from "./useLoader";
import { useNotifications } from "./useNotifications";
import { storage, STORAGE_KEYS } from "@/services/storage";

const API_URL = import.meta.env.VITE_API_USERS;
const currentUser = ref(storage.get(STORAGE_KEYS.USER_SESSION) || null);

export function useAuth() {
    const { showLoader, hideLoader } = useLoader();
    const { addNotification } = useNotifications();

    const register = async (name, email, password) => {
        showLoader();
        try {
            // Check if email exists
            const res = await axios.get(API_URL);
            const users = res.data;
            if (users.find(u => u.email === email)) {
                addNotification("Email already registered", "error");
                return false;
            }

            const newUser = {
                name,
                email,
                password, // In real app, hash this!
                admin: false // Default to false
            };

            const createRes = await axios.post(API_URL, newUser);
            currentUser.value = createRes.data;
            storage.save(STORAGE_KEYS.USER_SESSION, currentUser.value);
            addNotification("Registration successful!", "success");
            return true;
        } catch (error) {
            console.error(error);
            addNotification("Registration failed.", "error");
            return false;
        } finally {
            hideLoader();
        }
    };

    const login = async (email, password) => {
        showLoader();
        try {
            const res = await axios.get(API_URL);
            const users = res.data;
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                currentUser.value = user;
                storage.save(STORAGE_KEYS.USER_SESSION, currentUser.value);
                addNotification(`Welcome back, ${user.name}!`, "success");
                return true;
            } else {
                addNotification("Invalid email or password", "error");
                return false;
            }
        } catch (error) {
            console.error(error);
            addNotification("Login failed.", "error");
            return false;
        } finally {
            hideLoader();
        }
    };

    const logout = () => {
        currentUser.value = null;
        storage.remove(STORAGE_KEYS.USER_SESSION);
        addNotification("Logged out successfully", "success");
    };

    const isAuthenticated = computed(() => !!currentUser.value);
    const isAdmin = computed(() => !!currentUser.value && currentUser.value.admin === true);

    return {
        currentUser,
        isAuthenticated,
        isAdmin,
        register,
        login,
        logout
    };
}
