export const compose =
  (...functions: Function[]) =>
  (...args: unknown[]) =>
    functions.forEach((fn) => fn(...args));
