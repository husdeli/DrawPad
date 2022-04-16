export const compose =
  (...functions: Function[]) =>
  (args: unknown) =>
    functions.reduceRight((arg, fn) => fn(arg), args);
