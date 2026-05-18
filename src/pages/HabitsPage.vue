<template>
  <div class="habits-page">
    <div class="habits-container">
      <router-link to="/dashboard" class="back-btn">← Back</router-link>
      
      <h1>🎯 Habits</h1>
      <p class="page-subtitle">Track and build your daily habits</p>

      <button class="btn btn-primary" @click="showForm = !showForm">
        {{ showForm ? '✕ Close' : '+ New Habit' }}
      </button>

      <div v-if="showForm" class="habit-form">
        <input type="text" placeholder="Habit name" v-model="newHabit.name">
        <textarea placeholder="Habit description" rows="3" v-model="newHabit.description"></textarea>
        <select v-model="newHabit.frequency">
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        <button class="btn btn-primary">Create Habit</button>
      </div>

      <div class="habits-list">
        <p class="empty-state">No habits yet. Create one to get started!</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showForm = ref(false)
const newHabit = ref({ name: '', description: '', frequency: 'daily' })
</script>

<style scoped>
.habits-page {
  min-height: 100vh;
  padding: var(--space-lg);
}

.habits-container {
  max-width: 800px;
  margin: 0 auto;
}

.back-btn {
  display: inline-block;
  margin-bottom: var(--space-lg);
  color: var(--color-dark);
  text-decoration: none;
  font-weight: 600;
}

.habits-page h1 {
  color: var(--color-dark);
  margin-bottom: var(--space-sm);
}

.page-subtitle {
  color: var(--color-text-light);
  margin-bottom: var(--space-lg);
}

.btn {
  padding: var(--space-md) var(--space-lg);
  border: none;
  border-radius: var(--radius-lg);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  margin-bottom: var(--space-lg);
}

.btn-primary {
  background: linear-gradient(135deg, #ff69b4, #ff4f9a);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.habit-form {
  background: var(--color-glass);
  backdrop-filter: blur(15px);
  border-radius: var(--radius-2xl);
  padding: var(--space-lg);
  margin-bottom: var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.habit-form input,
.habit-form textarea,
.habit-form select {
  padding: var(--space-md);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-bg);
  color: var(--color-text);
  font-size: 1rem;
  font-family: inherit;
}

.habits-list {
  background: var(--color-glass);
  backdrop-filter: blur(15px);
  border-radius: var(--radius-2xl);
  padding: var(--space-lg);
  min-height: 200px;
}

.empty-state {
  text-align: center;
  color: var(--color-text-light);
  padding: var(--space-lg) 0;
}
</style>
