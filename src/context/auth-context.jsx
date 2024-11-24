/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/client";

const AuthContext = createContext({ isAuth: false, userId: '', loading: true });

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sub = supabase.auth.onAuthStateChange((_event, session) => {
      const userId = session?.user.id;
      const username = session?.user.user_metadata.display_name;
      setUserId(userId);
      setUsername(username);
      setLoading(false);

    });
    return () => {
      sub.data.subscription.unsubscribe();
    }
  }, []);

  const isAuth = Boolean(userId);

  return (
    <AuthContext.Provider value={{ isAuth, userId, loading, username }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}