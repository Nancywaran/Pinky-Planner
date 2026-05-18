<template>
  <div class="alarms-page">
    <div class="alarms-container">
      <router-link to="/dashboard" class="back-btn">← Back</router-link>
      
      <h1>⏰ Alarms</h1>
      <p class="page-subtitle">Set up and manage your alarms</p>

      <button class="btn btn-primary" @click="showForm = !showForm">
        {{ showForm ? '✕ Close' : '+ New Alarm' }}
      </button>

      <div v-if="showForm" class="alarm-form">
        <input type="text" placeholder="Alarm label" v-model="newAlarm.label">
        <input type="time" v-model="newAlarm.time">
        <select v-model="newAlarm.repeat">
          <option value="once">Once</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="custom">Custom</option>
        </select>
        <button class="btn btn-primary">Add Alarm</button>
      </div>

      <div class="alarms-list">
        <p class="empty-state">No alarms set. Create one to get started!</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showForm = ref(false)
const newAlarm = ref({ label: '', time: '', repeat: 'daily' })
</script>

<style scoped>
.alarms-page {
  min-height: 100vh;
  padding: var(--space-lg);
}

.alarms-container {
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

.alarms-page h1 {
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

.alarm-form {
  background: var(--color-glass);
  backdrop-filter: blur(15px);
  border-radius: var(--radius-2xl);
  padding: var(--space-lg);
  margin-bottom: var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.alarm-form input,
.alarm-form select {
  padding: var(--space-md);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-bg);
  color: var(--color-text);
  font-size: 1rem;
}

.alarms-list {
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
