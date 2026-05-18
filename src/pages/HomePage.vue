<template>
  <div class="home-page">
    <div class="home-container">
      <h1 class="home-title">🎀 Pinky Planner 🎀</h1>
      <p class="home-subtitle">Cute aesthetic planner for productive girlies ✨</p>
      
      <div class="features-grid">
        <div class="feature-card">
          <span class="feature-icon">💗</span>
          <h3>Reminders</h3>
          <p>Never miss important moments</p>
        </div>
        <div class="feature-card">
          <span class="feature-icon">🎯</span>
          <h3>Habits</h3>
          <p>Build amazing streaks</p>
        </div>
        <div class="feature-card">
          <span class="feature-icon">📝</span>
          <h3>Notes</h3>
          <p>Capture your thoughts</p>
        </div>
        <div class="feature-card">
          <span class="feature-icon">📅</span>
          <h3>Calendar</h3>
          <p>Plan your days</p>
        </div>
      </div>

      <div class="cta-buttons">
        <router-link to="/login" class="btn btn-primary">Log In</router-link>
        <router-link to="/signup" class="btn btn-secondary">Sign Up</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-lg);
}

.home-container {
  text-align: center;
  max-width: 900px;
  animation: fadeIn 0.5s ease-out;
}

.home-title {
  font-size: 3rem;
  color: var(--color-dark);
  margin-bottom: var(--space-md);
  animation: slideIn 0.5s ease-out;
}

.home-subtitle {
  font-size: 1.25rem;
  color: var(--color-text-light);
  margin-bottom: var(--space-3xl);
  animation: slideIn 0.5s ease-out 0.1s both;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-lg);
  margin-bottom: var(--space-3xl);
}

.feature-card {
  background: var(--color-glass);
  backdrop-filter: blur(15px);
  border-radius: var(--radius-2xl);
  padding: var(--space-lg);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all var(--transition-base);
  animation: slideIn 0.5s ease-out 0.2s both;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

.feature-icon {
  font-size: 2.5rem;
  display: block;
  margin-bottom: var(--space-md);
}

.feature-card h3 {
  color: var(--color-dark);
  margin-bottom: var(--space-sm);
}

.feature-card p {
  color: var(--color-text-light);
  font-size: 0.9rem;
}

.cta-buttons {
  display: flex;
  gap: var(--space-lg);
  justify-content: center;
  flex-wrap: wrap;
  animation: slideIn 0.5s ease-out 0.3s both;
}

.btn {
  padding: var(--space-md) var(--space-xl);
  font-size: 1rem;
  border-radius: var(--radius-xl);
  text-decoration: none;
  font-weight: 600;
  transition: all var(--transition-fast);
  display: inline-block;
}

.btn-primary {
  background: linear-gradient(135deg, #ff69b4, #ff4f9a);
  color: white;
  box-shadow: var(--shadow-lg);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-xl);
}

.btn-secondary {
  background: var(--color-bg);
  color: var(--color-dark);
  border: 2px solid var(--color-dark);
}

.btn-secondary:hover {
  background: var(--color-primary);
  color: white;
}

@media (max-width: 768px) {
  .home-title {
    font-size: 2.2rem;
  }

  .home-subtitle {
    font-size: 1rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .cta-buttons {
    flex-direction: column;
  }
}
</style>
