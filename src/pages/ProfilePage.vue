<template>
  <div class="profile-page">
    <div class="profile-container">
      <router-link to="/dashboard" class="back-btn">← Back</router-link>
      
      <div class="profile-header">
        <div class="profile-avatar">👤</div>
        <h1>My Profile</h1>
      </div>

      <div class="profile-card">
        <div class="profile-info">
          <p><strong>Email:</strong> user@example.com</p>
          <p><strong>Member Since:</strong> January 2024</p>
        </div>
        <button class="btn btn-primary">Edit Profile</button>
        <button class="btn btn-secondary" @click="handleLogout">Sign Out</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { signOut } = useAuth()

const handleLogout = async () => {
  await signOut()
  router.push('/login')
}
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  padding: var(--space-lg);
}

.profile-container {
  max-width: 600px;
  margin: 0 auto;
}

.back-btn {
  display: inline-block;
  margin-bottom: var(--space-lg);
  color: var(--color-dark);
  text-decoration: none;
  font-weight: 600;
  transition: all var(--transition-fast);
}

.back-btn:hover {
  transform: translateX(-4px);
}

.profile-header {
  text-align: center;
  margin-bottom: var(--space-2xl);
}

.profile-avatar {
  font-size: 4rem;
  margin-bottom: var(--space-lg);
  display: inline-block;
  animation: float 2s ease-in-out infinite;
}

.profile-header h1 {
  color: var(--color-dark);
}

.profile-card {
  background: var(--color-glass);
  backdrop-filter: blur(15px);
  border-radius: var(--radius-2xl);
  padding: var(--space-2xl);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: var(--shadow-lg);
}

.profile-info {
  margin-bottom: var(--space-lg);
}

.profile-info p {
  margin-bottom: var(--space-md);
  color: var(--color-text);
}

.btn {
  width: 100%;
  padding: var(--space-md);
  margin-bottom: var(--space-md);
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

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-secondary {
  background: var(--color-border);
  color: var(--color-text);
}

.btn-secondary:hover {
  background: var(--color-error);
  color: white;
}
</style>
