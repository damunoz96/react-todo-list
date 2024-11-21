import { useAuth } from "../context/auth-context";
import { supabase } from "../supabase/client";

export function useUser() {
  const { isAuth, userId } = useAuth();

  const logout = () => {
    supabase.auth.signOut();
    supabase.removeAllChannels();
  };

  const signin = async (email, password) => {
    const response = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log(response);
  }

  return { userId, logout, isAuth, signin };
}