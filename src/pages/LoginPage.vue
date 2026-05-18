<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-box">
        <h1 class="login-title">Welcome Back 💕</h1>
        <p class="login-subtitle">Sign in to your Pinky Planner</p>

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              v-model="email" 
              type="email" 
              id="email" 
              placeholder="you@example.com" 
              required
            >
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input 
              v-model="password" 
              type="password" 
              id="password" 
              placeholder="••••••••" 
              required
            >
          </div>

          <button type="submit" class="btn btn-primary" :disabled="loading">
            {{ loading ? '🔄 Signing in...' : 'Sign In' }}
          </button>
        </form>

        <div class="divider">OR</div>

        <button class="btn-google" @click="handleGoogleLogin" :disabled="loading">
          🔐 Continue with Google
        </button>

        <div class="login-footer">
          <p>Don't have an account? <router-link to="/signup">Sign up</router-link></p>
          <p><router-link to="/forgot-password">Forgot password?</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { signIn, signInWithGoogle, loading, error } = useAuth()

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    await signIn(email.value, password.value)
    router.push('/dashboard')
  } catch (err) {
    console.error(err)
  }
}

const handleGoogleLogin = async () => {
  try {
    await signInWithGoogle()
  } catch (err) {
    console.error(err)
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-lg);
}

.login-container {
  width: 100%;
  max-width: 400px;
}

.login-box {
  background: var(--color-glass);
  backdrop-filter: blur(15px);
  border-radius: var(--radius-2xl);
  padding: var(--space-2xl);
  box-shadow: var(--shadow-xl);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.login-title {
  text-align: center;
  color: var(--color-dark);
  margin-bottom: var(--space-sm);
}

.login-subtitle {
  text-align: center;
  color: var(--color-text-light);
  margin-bottom: var(--space-lg);
}

.login-form {
  margin-bottom: var(--space-lg);
}

.form-group {
  margin-bottom: var(--space-lg);
}

.form-group label {
  display: block;
  margin-bottom: var(--space-sm);
  color: var(--color-text);
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: var(--space-md);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-bg);
  color: var(--color-text);
  font-size: 1rem;
  transition: all var(--transition-fast);
}

.form-group input:focus {
  outline: none;
  border-color: var(--color-dark);
  box-shadow: 0 0 0 3px rgba(255, 105, 180, 0.1);
}

.btn {
  width: 100%;
  padding: var(--space-md);
  border: none;
  border-radius: var(--radius-lg);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn-primary {
  background: linear-gradient(135deg, #ff69b4, #ff4f9a);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.divider {
  text-align: center;
  color: var(--color-text-light);
  margin: var(--space-lg) 0;
  position: relative;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--color-border);
  z-index: -1;
}

.divider::after {
  content: 'OR';
  background: var(--color-glass);
  padding: 0 var(--space-md);
}

.btn-google {
  width: 100%;
  padding: var(--space-md);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-bg);
  color: var(--color-text);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn-google:hover:not(:disabled) {
  background: var(--color-border);
}

.btn-google:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.login-footer {
  text-align: center;
  margin-top: var(--space-lg);
}

.login-footer p {
  font-size: 0.9rem;
  color: var(--color-text-light);
  margin: var(--space-sm) 0;
}

.login-footer a {
  color: var(--color-dark);
  text-decoration: none;
  font-weight: 600;
  transition: color var(--transition-fast);
}

.login-footer a:hover {
  text-decoration: underline;
}
</style>
