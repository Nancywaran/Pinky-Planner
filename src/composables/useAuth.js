import { ref, computed } from 'vue'
import { supabase } from '@/lib/supabase'

const user = ref(null)
const loading = ref(false)
const error = ref(null)

export const useAuth = () => {
  const isAuthenticated = computed(() => !!user.value)

  const initAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    user.value = session?.user || null

    // Listen for auth changes
    supabase.auth.onAuthStateChange((event, session) => {
      user.value = session?.user || null
    })
  }

  const signUp = async (email, password, userData = {}) => {
    loading.value = true
    error.value = null
    try {
      const { data, error: err } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      })
      if (err) throw err
      return data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const signIn = async (email, password) => {
    loading.value = true
    error.value = null
    try {
      const { data, error: err } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (err) throw err
      user.value = data.user
      return data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const signInWithGoogle = async () => {
    loading.value = true
    error.value = null
    try {
      const { data, error: err } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      })
      if (err) throw err
      return data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const resetPassword = async (email) => {
    loading.value = true
    error.value = null
    try {
      const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })
      if (err) throw err
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const updatePassword = async (password) => {
    loading.value = true
    error.value = null
    try {
      const { error: err } = await supabase.auth.updateUser({
        password
      })
      if (err) throw err
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const signOut = async () => {
    loading.value = true
    try {
      const { error: err } = await supabase.auth.signOut()
      if (err) throw err
      user.value = null
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    isAuthenticated,
    loading,
    error,
    initAuth,
    signUp,
    signIn,
    signInWithGoogle,
    resetPassword,
    updatePassword,
    signOut
  }
}
