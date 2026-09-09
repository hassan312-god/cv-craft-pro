import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface SubscriptionState {
  isPremium: boolean;
  status: string | null;
  currentPeriodEnd: string | null;
  loading: boolean;
}

const activeStatuses = ["active", "trialing"];

export const useSubscription = (): SubscriptionState => {
  const { user, loading: authLoading } = useAuth();
  const [state, setState] = useState<SubscriptionState>({
    isPremium: false,
    status: null,
    currentPeriodEnd: null,
    loading: true,
  });

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (authLoading) return;
      if (!user) {
        if (!cancelled) {
          setState({ isPremium: false, status: null, currentPeriodEnd: null, loading: false });
        }
        return;
      }

      const { data } = await supabase
        .from("subscriptions")
        .select("status, current_period_end")
        .eq("user_id", user.id)
        .maybeSingle();

      if (cancelled) return;

      const status = data?.status ?? null;
      const periodEnd = data?.current_period_end ?? null;
      const notExpired = !periodEnd || new Date(periodEnd).getTime() > Date.now();

      setState({
        isPremium: Boolean(status && activeStatuses.includes(status) && notExpired),
        status,
        currentPeriodEnd: periodEnd,
        loading: false,
      });
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [user, authLoading]);

  return state;
};
