import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabase-client";
import { Session } from "@supabase/supabase-js";

type SessionContextType = {
  session: Session | null;
  loading: boolean;
};

const AuthSessionContext = createContext<SessionContextType>(
  {} as SessionContextType
);

type SessionProviderProps = {
  children: React.ReactNode;
};

export const AuthSessionProvider = ({ children }: SessionProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = async () => {
      const { data, error } = await supabase.auth.getSession();
      console.log(data,'what is data in getSession')
      if (data.session) {
        setLoading(false);
        setSession(data.session);
      } else {
        console.log(error);
      }
    };

    auth();

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });
  }, []);

  return (
    <AuthSessionContext.Provider value={{ session, loading }}>
      {children}
    </AuthSessionContext.Provider>
  );
};

export const useAuthSession = () => useContext(AuthSessionContext)
