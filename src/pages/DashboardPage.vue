<template>
  <div class="dashboard-page">
    <div class="dashboard-container">
      <header class="dashboard-header">
        <h1>Welcome back! 🎀</h1>
        <div class="header-actions">
          <button class="btn-theme" @click="toggleDarkMode" title="Toggle dark mode">
            {{ isDarkMode ? '☀️' : '🌙' }}
          </button>
          <router-link to="/profile" class="btn-profile">👤</router-link>
        </div>
      </header>

      <nav class="dashboard-nav">
        <router-link to="/dashboard" class="nav-item active">📊 Dashboard</router-link>
        <router-link to="/reminders" class="nav-item">🔔 Reminders</router-link>
        <router-link to="/alarms" class="nav-item">⏰ Alarms</router-link>
        <router-link to="/notes" class="nav-item">📝 Notes</router-link>
        <router-link to="/habits" class="nav-item">🎯 Habits</router-link>
        <router-link to="/calendar" class="nav-item">📅 Calendar</router-link>
      </nav>

      <div class="dashboard-content">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">💪</div>
            <div class="stat-info">
              <p class="stat-label">Productivity Score</p>
              <p class="stat-value">85%</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🔥</div>
            <div class="stat-info">
              <p class="stat-label">Current Streak</p>
              <p class="stat-value">7 days</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">✅</div>
            <div class="stat-info">
              <p class="stat-label">Tasks Completed</p>
              <p class="stat-value">42</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🎯</div>
            <div class="stat-info">
              <p class="stat-label">Goals Achieved</p>
              <p class="stat-value">5</p>
            </div>
          </div>
        </div>

        <div class="content-section">
          <h2>Upcoming Reminders 🔔</h2>
          <p class="empty-state">No upcoming reminders. <router-link to="/reminders">Create one!</router-link></p>
        </div>

        <div class="content-section">
          <h2>Active Habits 🎯</h2>
          <p class="empty-state">No habits yet. <router-link to="/habits">Start tracking!</router-link></p>
        </div>

        <div class="bunny-assistant">
          <span class="bunny">🐰</span>
          <div class="bunny-message">
            <p>Hey there! You're doing amazing! Keep up the great work! 💕</p>
          </div>
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
const { signOut } = useAuth()

const isDarkMode = ref(localStorage.getItem('darkMode') === 'true')

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  localStorage.setItem('darkMode', isDarkMode.value)
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark-mode')
  } else {
    document.documentElement.classList.remove('dark-mode')
  }
}

const handleLogout = async () => {
  await signOut()
  router.push('/login')
}
</script>

<style scoped>
.dashboard-page {
  min-height: 100vh;
  padding: var(--space-lg);
}

.dashboard-container {
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-2xl);
}

.dashboard-header h1 {
  color: var(--color-dark);
  font-size: 2rem;
}

.header-actions {
  display: flex;
  gap: var(--space-lg);
  align-items: center;
}

.btn-theme,
.btn-profile {
  background: var(--color-glass);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-full);
  width: 45px;
  height: 45px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn-theme:hover,
.btn-profile:hover {
  transform: scale(1.1);
  box-shadow: var(--shadow-md);
}

.dashboard-nav {
  display: flex;
  gap: var(--space-md);
  margin-bottom: var(--space-2xl);
  flex-wrap: wrap;
  background: var(--color-glass);
  padding: var(--space-md);
  border-radius: var(--radius-2xl);
  backdrop-filter: blur(15px);
}

.nav-item {
  padding: var(--space-md) var(--space-lg);
  border-radius: var(--radius-lg);
  text-decoration: none;
  color: var(--color-text);
  font-weight: 500;
  transition: all var(--transition-fast);
  border: 2px solid transparent;
}

.nav-item:hover {
  background: var(--color-border);
}

.nav-item.active {
  background: linear-gradient(135deg, #ff69b4, #ff4f9a);
  color: white;
}

.dashboard-content {
  animation: fadeIn 0.5s ease-out;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-lg);
  margin-bottom: var(--space-2xl);
}

.stat-card {
  background: var(--color-glass);
  backdrop-filter: blur(15px);
  border-radius: var(--radius-2xl);
  padding: var(--space-lg);
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all var(--transition-base);
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.stat-icon {
  font-size: 2.5rem;
}

.stat-info {
  flex: 1;
}

.stat-label {
  color: var(--color-text-light);
  font-size: 0.9rem;
  margin-bottom: var(--space-sm);
}

.stat-value {
  color: var(--color-dark);
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}

.content-section {
  background: var(--color-glass);
  backdrop-filter: blur(15px);
  border-radius: var(--radius-2xl);
  padding: var(--space-lg);
  margin-bottom: var(--space-lg);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.content-section h2 {
  color: var(--color-dark);
  margin-bottom: var(--space-lg);
}

.empty-state {
  text-align: center;
  color: var(--color-text-light);
  padding: var(--space-lg) 0;
}

.empty-state a {
  color: var(--color-dark);
  text-decoration: none;
  font-weight: 600;
}

.bunny-assistant {
  display: flex;
  align-items: flex-end;
  gap: var(--space-lg);
  margin-top: var(--space-2xl);
  animation: slideIn 0.5s ease-out;
}

.bunny {
  font-size: 3rem;
  animation: float 2s ease-in-out infinite;
}

.bunny-message {
  background: var(--color-glass);
  backdrop-filter: blur(15px);
  border-radius: var(--radius-2xl);
  padding: var(--space-lg);
  border: 1px solid rgba(255, 255, 255, 0.2);
  flex: 1;
  max-width: 400px;
}

.bunny-message p {
  color: var(--color-dark);
  margin: 0;
  font-weight: 500;
}

@media (max-width: 768px) {
  .dashboard-header {
    flex-direction: column;
    gap: var(--space-lg);
    align-items: flex-start;
  }

  .dashboard-header h1 {
    font-size: 1.5rem;
  }

  .dashboard-nav {
    flex-wrap: wrap;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .bunny-assistant {
    flex-direction: column;
  }
}
</style>
