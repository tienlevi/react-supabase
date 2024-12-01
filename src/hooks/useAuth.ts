import { useEffect, useState } from "react";
import supabase from "../config/supabase";
import { getUser } from "../services/auth";

function useAuth() {
  const [token, setToken] = useState<string>("");
  const [event, setEvent] = useState<string>("");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setToken(session?.access_token!);
      setEvent(event);
    });
    (async () => {
      const response = await getUser(token);
      setUser(response);
    })();

    return () => data.subscription.unsubscribe();
  }, []);

  return { user, event };
}

export default useAuth;
