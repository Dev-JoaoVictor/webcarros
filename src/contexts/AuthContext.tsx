import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebaseConnection";
import { ReactNode, createContext, useState, useEffect } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

type AuthContextData = {
  signed: boolean,
  loadingAuth: boolean,
  handleInfoUser: ({ name, email, uid }: UserProps) => void,
  user: UserProps | null,
}

interface UserProps {
  uid: string;
  name: string | null;
  email: string | null;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {

  const [user, setUser] = useState<UserProps | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        const { displayName, email, uid } = user;
        setUser({
          uid,
          name: displayName,
          email,
        })
        setLoadingAuth(false);
      } else {
        setUser(null);
        setLoadingAuth(false);
      }
    })

    return () => {
      unsubscribe();
    }
  }, [])

  function handleInfoUser({ name, email, uid }: UserProps) {
    return (
      setUser({
        uid,
        name,
        email,
      })
    )
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, loadingAuth, handleInfoUser, user }}>
      {children}
    </AuthContext.Provider>
  )
}