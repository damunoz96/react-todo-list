/* eslint-disable no-undef */
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ihjjhnnkhjeefhbjwxjv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imloampobm5raGplZWZoYmp3eGp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA0OTk5MTIsImV4cCI6MjA0NjA3NTkxMn0.tPqfU6b_6AD1FoFAlEibve9H-V4a5Fao6mki9lEgxEY";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  supabaseUrl,
  supabaseKey
  
);
