export type LoggerActionsTypes = "SHIFT" | "PUSH";

export interface Action<T extends string, P = unknown> {
  type: T;
  payload?: P;
}

export interface LoggerShiftAction extends Action<"SHIFT"> {
  type: "SHIFT";
}

export interface LoggerClearAction extends Action<"CLEAR"> {
  type: "CLEAR";
}

export interface LoggerPushAction extends Action<"PUSH", string> {
  type: "PUSH";
  payload: string;
}

export type LoggerActions =
  | LoggerShiftAction
  | LoggerPushAction
  | LoggerClearAction;

export function loggerShiftAction(): LoggerShiftAction {
  return {
    type: "SHIFT",
  };
}

export function loggerPushAction(payload: string): LoggerPushAction {
  return {
    type: "PUSH",
    payload: payload,
  };
}

export function loggerClearAction(): LoggerClearAction {
  return {
    type: "CLEAR",
  };
}
