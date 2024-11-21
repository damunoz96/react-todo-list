import { useAuth } from "../context/auth-context";
import { supabase } from "../supabase/client";

export function useUser() {
  const { isAuth, userId } = useAuth();

  const logout = () => {
    supabase.auth.signOut();
    supabase.removeAllChannels();
  };

  const signin = async (email, password) => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
  }

  const singup = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    console.log({data, error})
  }

  return { userId, logout, isAuth, signin, singup };
}