import { createContext, useContext } from "react";
import { usePageState } from "../hooks/usePageState";
import { Page } from "../utils/types";
import { withState } from "../components/withState";

type AppContextType = ReturnType<typeof usePageState>;

const AppStateContext = createContext<AppContextType>({} as AppContextType);

type ProviderProps = {
  children: React.ReactNode;
  initialState: Page;
};



export const AppStateProvider = withState<ProviderProps>(({ children, initialState }: ProviderProps) => {
  const pageStateHandlers = usePageState(initialState);

  return (
    <AppStateContext.Provider value={pageStateHandlers}>
      {children}
    </AppStateContext.Provider>
  );
})

// eslint-disable-next-line react-refresh/only-export-components
export const useAppState = () => useContext(AppStateContext);
