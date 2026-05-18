<template>
  <div class="calendar-page">
    <div class="calendar-container">
      <router-link to="/dashboard" class="back-btn">← Back</router-link>
      
      <h1>📅 Calendar</h1>
      <p class="page-subtitle">View and plan your schedule</p>

      <div class="calendar-view">
        <p class="empty-state">Calendar feature coming soon!</p>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.calendar-page {
  min-height: 100vh;
  padding: var(--space-lg);
}

.calendar-container {
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

.calendar-page h1 {
  color: var(--color-dark);
  margin-bottom: var(--space-sm);
}

.page-subtitle {
  color: var(--color-text-light);
  margin-bottom: var(--space-lg);
}

.calendar-view {
  background: var(--color-glass);
  backdrop-filter: blur(15px);
  border-radius: var(--radius-2xl);
  padding: var(--space-lg);
  min-height: 300px;
}

.empty-state {
  text-align: center;
  color: var(--color-text-light);
  padding: var(--space-lg) 0;
}
</style>
