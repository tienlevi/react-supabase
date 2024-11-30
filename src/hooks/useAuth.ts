import { useEffect, useState } from "react";
import supabase from "../config/supabase";

function useAuth() {
  const [user, setUser] = useState({});
  const [event, setEvent] = useState<string>("");

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user!);
      setEvent(event);
    });
  }, []);

  return { user, event };
}

export default useAuth;
