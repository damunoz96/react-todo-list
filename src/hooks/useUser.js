import { toast } from "sonner";
import { useAuth } from "../context/auth-context";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";

export function useUser() {
  const { isAuth, userId, username } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    supabase.auth.signOut();
    supabase.removeAllChannels();
  };

  const signin = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {toast.error("Incorrect email or password")} else {
      toast.success('Successfully logged')
    } ;
    
  }

  const singup = async (email, password, displayname) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data:{
          display_name: displayname,
        },
      },
    });
    if (error) { toast.error('An error have ocurred')} else {
      toast.success("Sign up successfully");
      navigate('/login');
    }
  }
  
  const passwordrecovery = async (email) => {
    // eslint-disable-next-line no-undef
    const redirectTo = `${location.origin}/resetpassword`;
    console.log(redirectTo);
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });
  }

  const updatepassword = async (password) => {
    await supabase.auth.updateUser({
      password
    })
  }

  return { userId, username, logout, isAuth, signin, singup, passwordrecovery, updatepassword };
}