import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type User = { email: string };

interface AppContextType {
  user: User | null;
  updateUser: (data: User) => void;
}

const AppContext = createContext<Partial<AppContextType>>({});

const AppWrapper = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User>();

  const updateUser = (dt: User) => {
    setUser(dt);
  };

  const values = {
    user,
    updateUser,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export const useUser = () => useContext(AppContext);

export default AppWrapper;
