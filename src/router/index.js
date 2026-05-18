import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '@/lib/supabase'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/HomePage.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/LoginPage.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('@/pages/SignupPage.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/pages/DashboardPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/pages/ProfilePage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/reminders',
    name: 'Reminders',
    component: () => import('@/pages/RemindersPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/alarms',
    name: 'Alarms',
    component: () => import('@/pages/AlarmsPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/notes',
    name: 'Notes',
    component: () => import('@/pages/NotesPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/habits',
    name: 'Habits',
    component: () => import('@/pages/HabitsPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: () => import('@/pages/CalendarPage.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Auth guard
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth) {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
