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

  const passwordrecovery = async (email) => {
    await supabase.auth.resetPasswordForEmail(email, {
      'redirectTo': "http://localhost:5173/resetpassword",
    });
  }

  const updatepassword = async (password) => {
    await supabase.auth.updateUser({
      password
    })
  }

  return { userId, logout, isAuth, signin, singup, passwordrecovery, updatepassword };
}