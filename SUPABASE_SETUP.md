# Pinky Planner - Supabase Setup Guide

## 🔐 Your Project Credentials

Your Supabase project is ready! Here's how to set it up:

### Step 1: Get Your Credentials

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/wjbtsaknflhpvvvhipgi
2. Click **Settings** (bottom left)
3. Click **API**
4. Copy these two values:
   - **Project URL** (looks like: `https://wjbtsaknflhpvvvhipgi.supabase.co`)
   - **anon public** (the API key)

### Step 2: Update Your .env.local

```bash
VITE_SUPABASE_URL=https://wjbtsaknflhpvvvhipgi.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_APP_NAME=Pinky Planner
VITE_APP_URL=http://localhost:5173
```

### Step 3: Create Database Tables

Go to your Supabase Dashboard and click **SQL Editor** on the left. Run these SQL commands one by one:

#### Table 1: Users (Auto-created by Supabase Auth)
```sql
-- Users are auto-created by Supabase Auth
-- Additional user profile table:
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);
```

#### Table 2: Reminders
```sql
CREATE TABLE public.reminders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  category TEXT DEFAULT 'personal',
  is_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE public.reminders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own reminders" 
  ON public.reminders FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create reminders" 
  ON public.reminders FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reminders" 
  ON public.reminders FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reminders" 
  ON public.reminders FOR DELETE 
  USING (auth.uid() = user_id);
```

#### Table 3: Alarms
```sql
CREATE TABLE public.alarms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  time TIME NOT NULL,
  repeat_type TEXT DEFAULT 'once', -- once, daily, weekly, custom
  repeat_days TEXT[], -- array of day names for weekly
  is_enabled BOOLEAN DEFAULT TRUE,
  ringtone_url TEXT,
  snooze_duration_minutes INTEGER DEFAULT 5,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE public.alarms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own alarms" 
  ON public.alarms FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create alarms" 
  ON public.alarms FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own alarms" 
  ON public.alarms FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own alarms" 
  ON public.alarms FOR DELETE 
  USING (auth.uid() = user_id);
```

#### Table 4: Notes
```sql
CREATE TABLE public.notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  category TEXT DEFAULT 'personal',
  is_pinned BOOLEAN DEFAULT FALSE,
  color TEXT DEFAULT '#FFC0CB',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own notes" 
  ON public.notes FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create notes" 
  ON public.notes FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own notes" 
  ON public.notes FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own notes" 
  ON public.notes FOR DELETE 
  USING (auth.uid() = user_id);
```

#### Table 5: Habits
```sql
CREATE TABLE public.habits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  frequency TEXT DEFAULT 'daily', -- daily, weekly, monthly
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  color TEXT DEFAULT '#FF69B4',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE public.habits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own habits" 
  ON public.habits FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create habits" 
  ON public.habits FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own habits" 
  ON public.habits FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own habits" 
  ON public.habits FOR DELETE 
  USING (auth.uid() = user_id);
```

#### Table 6: Habit Logs (Track daily completions)
```sql
CREATE TABLE public.habit_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  habit_id UUID NOT NULL REFERENCES public.habits(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  completed_at TIMESTAMP DEFAULT NOW(),
  notes TEXT
);

ALTER TABLE public.habit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own habit logs" 
  ON public.habit_logs FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create habit logs" 
  ON public.habit_logs FOR INSERT 
  WITH CHECK (auth.uid() = user_id);
```

#### Table 7: Tasks
```sql
CREATE TABLE public.tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  is_completed BOOLEAN DEFAULT FALSE,
  due_date TIMESTAMP WITH TIME ZONE,
  category TEXT DEFAULT 'personal',
  priority TEXT DEFAULT 'medium', -- low, medium, high
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own tasks" 
  ON public.tasks FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create tasks" 
  ON public.tasks FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tasks" 
  ON public.tasks FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tasks" 
  ON public.tasks FOR DELETE 
  USING (auth.uid() = user_id);
```

---

## 🔑 Enable Google OAuth (Optional)

1. In your Supabase Dashboard, go to **Authentication** → **Providers**
2. Find **Google** and enable it
3. Add your Google OAuth credentials (get from Google Cloud Console)

---

## ✅ Verify Everything is Set Up

```bash
# 1. Update .env.local with your credentials
# 2. Run the app
npm run dev

# 3. Try to sign up with email at http://localhost:5173
# 4. You should see users appearing in Supabase Auth
# 5. Try creating reminders, notes, habits
# 6. Check Supabase to see data being saved!
```

---

## 🎯 What's Now Ready to Use

✅ User Authentication (Email/Password)  
✅ User Profiles  
✅ Reminders with categories  
✅ Alarms with repeat patterns  
✅ Notes with colors  
✅ Habits with streak tracking  
✅ Habit completion logs  
✅ Tasks with priority levels  
✅ All data is private (Row Level Security)  

---

## 📊 Next Steps

1. Update `.env.local` with your Supabase credentials
2. Run `npm run dev`
3. Test signup and data creation
4. Tell me if you want to add:
   - Google OAuth
   - File uploads (profile pics, note attachments)
   - Calendar view
   - Advanced analytics
   - Push notifications
   - PWA/Android support
