import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { identify, reset } from '../lib/analytics';

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      /* ── Mode démo : lit le profil localStorage ── */
      const saved = localStorage.getItem('sensia_profile');
      if (saved) {
        const p = JSON.parse(saved);
        setUser({ id: 'demo', email: p.email || 'demo@sensia.app', prenom: p.firstName || p.name, ...p });
      }
      setLoading(false);
      return;
    }

    /* ── Supabase configuré ── */
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email, password, prenom) => {
    if (!isSupabaseConfigured) {
      const u = { id: 'demo', email, prenom };
      setUser(u);
      return { data: { user: u }, error: null };
    }
    const { data, error } = await supabase.auth.signUp({
      email, password,
      options: { data: { prenom } },
    });
    if (data?.user) identify(data.user.id, { email, prenom });
    return { data, error };
  };

  const signIn = async (email, password) => {
    if (!isSupabaseConfigured) {
      const u = { id: 'demo', email };
      setUser(u);
      return { data: { user: u }, error: null };
    }
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (data?.user) identify(data.user.id, { email });
    return { data, error };
  };

  const signInWithGoogle = async () => {
    if (!isSupabaseConfigured) return { error: { message: 'Supabase non configuré' } };
    return supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/home` },
    });
  };

  const signOut = async () => {
    reset();
    if (isSupabaseConfigured) await supabase.auth.signOut();
    setUser(null);
    if (!isSupabaseConfigured) localStorage.removeItem('sensia_profile');
  };

  const resetPassword = async (email) => {
    if (!isSupabaseConfigured) return { data: null, error: null };
    return supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
  };

  return (
    <AuthContext.Provider value={{
      user, loading,
      isDemo: !isSupabaseConfigured,
      signUp, signIn, signInWithGoogle, signOut, resetPassword,
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
