export interface LoggerState {
  queue: string[];
  hasItems: boolean;
}

export const LoggerInitialState: LoggerState = {
  queue: [],
  hasItems: false,
};
