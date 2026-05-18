import { ref } from 'vue'
import { supabase } from '@/lib/supabase'

export const useData = () => {
  const tasks = ref([])
  const reminders = ref([])
  const notes = ref([])
  const habits = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Tasks
  const loadTasks = async (userId) => {
    loading.value = true
    error.value = null
    try {
      const { data, error: err } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
      if (err) throw err
      tasks.value = data || []
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const addTask = async (task, userId) => {
    loading.value = true
    try {
      const { data, error: err } = await supabase
        .from('tasks')
        .insert([{ ...task, user_id: userId }])
        .select()
      if (err) throw err
      tasks.value.unshift(data[0])
      return data[0]
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateTask = async (taskId, updates) => {
    try {
      const { data, error: err } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', taskId)
        .select()
      if (err) throw err
      const index = tasks.value.findIndex(t => t.id === taskId)
      if (index > -1) tasks.value[index] = data[0]
      return data[0]
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  const deleteTask = async (taskId) => {
    try {
      const { error: err } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId)
      if (err) throw err
      tasks.value = tasks.value.filter(t => t.id !== taskId)
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  // Reminders
  const loadReminders = async (userId) => {
    loading.value = true
    try {
      const { data, error: err } = await supabase
        .from('reminders')
        .select('*')
        .eq('user_id', userId)
        .order('scheduled_at', { ascending: true })
      if (err) throw err
      reminders.value = data || []
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const addReminder = async (reminder, userId) => {
    try {
      const { data, error: err } = await supabase
        .from('reminders')
        .insert([{ ...reminder, user_id: userId }])
        .select()
      if (err) throw err
      reminders.value.push(data[0])
      return data[0]
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  // Notes
  const loadNotes = async (userId) => {
    loading.value = true
    try {
      const { data, error: err } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
      if (err) throw err
      notes.value = data || []
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const addNote = async (note, userId) => {
    try {
      const { data, error: err } = await supabase
        .from('notes')
        .insert([{ ...note, user_id: userId }])
        .select()
      if (err) throw err
      notes.value.unshift(data[0])
      return data[0]
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  // Habits
  const loadHabits = async (userId) => {
    loading.value = true
    try {
      const { data, error: err } = await supabase
        .from('habits')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
      if (err) throw err
      habits.value = data || []
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const addHabit = async (habit, userId) => {
    try {
      const { data, error: err } = await supabase
        .from('habits')
        .insert([{ ...habit, user_id: userId }])
        .select()
      if (err) throw err
      habits.value.push(data[0])
      return data[0]
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  return {
    tasks,
    reminders,
    notes,
    habits,
    loading,
    error,
    loadTasks,
    addTask,
    updateTask,
    deleteTask,
    loadReminders,
    addReminder,
    loadNotes,
    addNote,
    loadHabits,
    addHabit
  }
}
