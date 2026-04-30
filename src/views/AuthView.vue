<template>
    <main class="auth-page container">
        <div class="auth-card">
            <div class="auth-header">
                <button 
                    class="tab-btn" 
                    :class="{ active: isLoginMode }" 
                    @click="isLoginMode = true"
                >
                    Login
                </button>
                <button 
                    class="tab-btn" 
                    :class="{ active: !isLoginMode }" 
                    @click="isLoginMode = false"
                >
                    Register
                </button>
            </div>

            <form @submit.prevent="handleSubmit" class="auth-form">
                <div v-if="!isLoginMode" class="form-group">
                    <label for="name">Full Name</label>
                    <input type="text" id="name" v-model="form.name" required placeholder="John Doe" />
                </div>

                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model="form.email" required placeholder="john@example.com" />
                </div>

                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model="form.password" required placeholder="********" />
                </div>

                <button type="submit" class="btn btn-primary submit-btn">
                    {{ isLoginMode ? 'Sign In' : 'Create Account' }}
                </button>
            </form>
        </div>
    </main>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';

const router = useRouter();
const route = useRoute();
const { login, register } = useAuth();

const isLoginMode = ref(true);
const form = ref({
    name: '',
    email: '',
    password: ''
});

const handleSubmit = async () => {
    let success = false;
    if (isLoginMode.value) {
        success = await login(form.value.email, form.value.password);
    } else {
        success = await register(form.value.name, form.value.email, form.value.password);
    }

    if (success) {
        const redirectPath = route.query.redirect || '/catalog';
        router.push(redirectPath);
    }
};
</script>

<style scoped>
.auth-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 60vh;
    padding: 40px 20px;
}

.auth-card {
    background: var(--white);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    width: 100%;
    max-width: 400px;
    padding: 30px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
}

.auth-header {
    display: flex;
    border-bottom: 2px solid var(--bg-color);
    margin-bottom: 25px;
}

.tab-btn {
    flex: 1;
    background: none;
    border: none;
    padding: 15px;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-light);
    cursor: pointer;
    border-bottom: 2px solid transparent;
    margin-bottom: -2px;
    transition: all 0.3s;
}

.tab-btn.active {
    color: var(--primary-color);
    border-bottom-color: var(--primary-color);
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: var(--primary-color);
}

input {
    width: 100%;
    padding: 12px 15px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    font-family: inherit;
    font-size: 1rem;
    background: #fdfdfd;
    transition: border-color 0.3s;
}

input:focus {
    outline: none;
    border-color: var(--primary-color);
}

.submit-btn {
    width: 100%;
    padding: 15px;
    font-size: 1.1rem;
    margin-top: 10px;
}
</style>
