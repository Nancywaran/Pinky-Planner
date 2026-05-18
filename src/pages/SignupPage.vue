<template>
  <div class="signup-page">
    <div class="signup-container">
      <div class="signup-box">
        <h1 class="signup-title">Join Us 🌸</h1>
        <p class="signup-subtitle">Create your Pinky Planner account</p>

        <form @submit.prevent="handleSignup" class="signup-form">
          <div class="form-group">
            <label for="name">Full Name</label>
            <input 
              v-model="name" 
              type="text" 
              id="name" 
              placeholder="Your name" 
              required
            >
          </div>

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

          <div class="form-group">
            <label for="confirm-password">Confirm Password</label>
            <input 
              v-model="confirmPassword" 
              type="password" 
              id="confirm-password" 
              placeholder="••••••••" 
              required
            >
          </div>

          <button type="submit" class="btn btn-primary" :disabled="loading">
            {{ loading ? '🔄 Creating account...' : 'Sign Up' }}
          </button>
        </form>

        <div class="signup-footer">
          <p>Already have an account? <router-link to="/login">Sign in</router-link></p>
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
const { signUp, loading } = useAuth()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const handleSignup = async () => {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match!')
    return
  }

  try {
    await signUp(email.value, password.value, { name: name.value })
    router.push('/dashboard')
  } catch (err) {
    console.error(err)
  }
}
</script>

<style scoped>
.signup-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-lg);
}

.signup-container {
  width: 100%;
  max-width: 400px;
}

.signup-box {
  background: var(--color-glass);
  backdrop-filter: blur(15px);
  border-radius: var(--radius-2xl);
  padding: var(--space-2xl);
  box-shadow: var(--shadow-xl);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.signup-title {
  text-align: center;
  color: var(--color-dark);
  margin-bottom: var(--space-sm);
}

.signup-subtitle {
  text-align: center;
  color: var(--color-text-light);
  margin-bottom: var(--space-lg);
}

.signup-form {
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

.signup-footer {
  text-align: center;
  margin-top: var(--space-lg);
}

.signup-footer p {
  font-size: 0.9rem;
  color: var(--color-text-light);
}

.signup-footer a {
  color: var(--color-dark);
  text-decoration: none;
  font-weight: 600;
  transition: color var(--transition-fast);
}

.signup-footer a:hover {
  text-decoration: underline;
}
</style>
