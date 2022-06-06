import { createContext } from "preact";
import { LoggerActions } from "./logger.actions";
import { LoggerState } from "./logger.state";

interface LoggerContextType {
  dispatch: (action: LoggerActions) => void;
  state: LoggerState;
}

export const LoggerContext = createContext<null | LoggerContextType>(null);
