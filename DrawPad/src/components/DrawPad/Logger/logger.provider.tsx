import { h } from "preact";
import { useMemo, useReducer } from "preact/hooks";
import { loggerReducer } from "./logger.reducer";
import { LoggerInitialState } from "./logger.state";
import { LoggerContext } from "./logger.context";

export function LoggerProvider({ children }: JSX.ElementChildrenAttribute) {
  const [state, dispatch] = useReducer(loggerReducer, LoggerInitialState);

  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch]
  );

  return (
    <LoggerContext.Provider value={contextValue}>
      {children}
    </LoggerContext.Provider>
  );
}
