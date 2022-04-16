import { LoggerState } from "./logger.state";
import { LoggerActions } from "./logger.actions";

export function loggerReducer(state: LoggerState, action: LoggerActions) {
  switch (action.type) {
    case "SHIFT": {
      const result = state.queue.slice(1);
      return {
        queue: result,
        hasItems: !!result.length,
      };
    }
    case "PUSH": {
      const result = [...state.queue, action.payload];
      return {
        queue: result,
        hasItems: !!result.length,
      };
    }
    case "CLEAR": {
      return {
        queue: [],
        hasItems: false,
      };
    }
  }
}
