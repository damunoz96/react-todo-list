import { toast } from "sonner";
import { useAuth } from "../context/auth-context";
import { supabase } from "../supabase/client";

export function useUser() {
  const { isAuth, userId, username } = useAuth();

  const logout = () => {
    supabase.auth.signOut();
    supabase.removeAllChannels();
  };

  const signin = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) toast.error("Incorrect email or password");
    toast.success('Successfully logged')
  }

  const singup = async (email, password, displayname) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data:{
          display_name: displayname,
        },
      },
    });
    console.log({data, error})
  }

  const passwordrecovery = async (email) => {
    await supabase.auth.resetPasswordForEmail(email, {
      // eslint-disable-next-line no-undef
      'redirectTo': `${location.hostname}/resetpassword`,
    });
  }

  const updatepassword = async (password) => {
    await supabase.auth.updateUser({
      password
    })
  }

  return { userId, username, logout, isAuth, signin, singup, passwordrecovery, updatepassword };
}