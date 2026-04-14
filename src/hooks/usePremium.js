import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export function usePremium() {
  const { user } = useAuth();
  const [isPremium, setIsPremium] = useState(false);
  const [plan,      setPlan]      = useState('free');
  const [daysLeft,  setDaysLeft]  = useState(null);
  const [loading,   setLoading]   = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }

    // Mode démo ou Supabase non configuré → vérifie localStorage
    const localSub = localStorage.getItem('sensia_subscription');
    if (localSub) {
      const s = JSON.parse(localSub);
      setIsPremium(s.isPremium || false);
      setPlan(s.plan || 'free');
      setDaysLeft(s.daysLeft ?? null);
      setLoading(false);
      return;
    }

    if (!isSupabaseConfigured) { setLoading(false); return; }

    supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .single()
      .then(({ data }) => {
        if (!data) { setLoading(false); return; }
        const now = new Date();
        const periodEnd = data.current_period_end ? new Date(data.current_period_end) : null;
        const trialEnd  = data.trial_end          ? new Date(data.trial_end)          : null;

        const active = data.status === 'active' && periodEnd && periodEnd > now;
        const inTrial = trialEnd && trialEnd > now;

        setIsPremium(active || inTrial);
        setPlan(data.plan || 'free');

        if (inTrial && trialEnd) {
          setDaysLeft(Math.ceil((trialEnd - now) / 86400000));
        } else if (active && periodEnd) {
          setDaysLeft(Math.ceil((periodEnd - now) / 86400000));
        }
        setLoading(false);
      });
  }, [user]);

  return { isPremium, plan, daysLeft, loading };
}
