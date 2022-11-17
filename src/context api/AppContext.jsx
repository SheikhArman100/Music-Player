import { createContext, useMemo, useState } from "react";

export const AppContext = createContext(null);

function AppContextProvider({ children }) {
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const values = useMemo(
    () => ({
      playing,
      setPlaying,
      currentTime,
      setCurrentTime,
    }),
    [playing, currentTime],
  );
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}
export default AppContextProvider;
