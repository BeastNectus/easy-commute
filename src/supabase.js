import { createClient } from "@supabase/supabase-js";

// Use the following configuration when deploying to production
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseUrl = 'https://cgheyywqyyekgvbermur.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnaGV5eXdxeXlla2d2YmVybXVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyMDA2OTcsImV4cCI6MjA0ODc3NjY5N30.YaTp0hE0_YjMVu6n1k9jTkZPWTo3vIiJR5I3o9Cd73Y';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);