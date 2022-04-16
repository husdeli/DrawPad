import { useContext } from "preact/hooks";
import {
  loggerClearAction,
  loggerPushAction,
  loggerShiftAction,
} from "../Logger/logger.actions";
import { LoggerContext } from "../Logger/logger.context";

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
