<template>
  <div class="reminders-page">
    <div class="reminders-container">
      <router-link to="/dashboard" class="back-btn">← Back</router-link>
      
      <h1>🔔 Reminders</h1>
      <p class="page-subtitle">Create and manage your reminders</p>

      <button class="btn btn-primary" @click="showForm = !showForm">
        {{ showForm ? '✕ Close' : '+ New Reminder' }}
      </button>

      <div v-if="showForm" class="reminder-form">
        <input type="text" placeholder="Reminder text" v-model="newReminder.text">
        <input type="datetime-local" v-model="newReminder.datetime">
        <select v-model="newReminder.category">
          <option value="">Select Category</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="health">Health</option>
        </select>
        <button class="btn btn-primary">Add Reminder</button>
      </div>

      <div class="reminders-list">
        <p class="empty-state">No reminders yet. Create one to get started!</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showForm = ref(false)
const newReminder = ref({ text: '', datetime: '', category: '' })
</script>

<style scoped>
.reminders-page {
  min-height: 100vh;
  padding: var(--space-lg);
}

.reminders-container {
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

.reminders-page h1 {
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

.reminder-form {
  background: var(--color-glass);
  backdrop-filter: blur(15px);
  border-radius: var(--radius-2xl);
  padding: var(--space-lg);
  margin-bottom: var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.reminder-form input,
.reminder-form select {
  padding: var(--space-md);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-bg);
  color: var(--color-text);
  font-size: 1rem;
}

.reminders-list {
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
