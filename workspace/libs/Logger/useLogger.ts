import { useContext } from "preact/hooks";
import {
  loggerClearAction,
  loggerPushAction,
  loggerShiftAction,
} from "./logger.actions";
import { LoggerContext } from "./logger.context";

export function useLogger() {
  const context = useContext(LoggerContext);

  if (!context) {
    throw new Error("No provider!");
  }

  const { state, dispatch } = context;

  return {
    ...state,
    push: (msg: string) => {
      dispatch(loggerPushAction(msg));
    },
    shift: () => {
      dispatch(loggerShiftAction());
      return state.queue[0];
    },
    clear: () => dispatch(loggerClearAction()),
  };
}
