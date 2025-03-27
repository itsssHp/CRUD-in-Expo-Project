import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://umftjlvtbnobasotruvb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtZnRqbHZ0Ym5vYmFzb3RydXZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5OTg5NzksImV4cCI6MjA1ODU3NDk3OX0.Le4tPLXDZZXEyR1jcEX-CBBW2EDdzB-ex1T81FPSYmc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
