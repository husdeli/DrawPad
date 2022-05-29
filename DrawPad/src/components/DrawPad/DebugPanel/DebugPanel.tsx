import { h } from "preact";
import { useLogger } from "../Hooks/useLogger";

export function DebugPanel() {
  const { queue, clear } = useLogger();

  return (
    <ul className="fixed top-0 right-1.5 w-1/2 h-1/2 bg-neutral-200 max-w-xl overflow-auto">
      {queue.map((message, idx) => (
        <li key={idx}>
          <pre>{message}</pre>
        </li>
      ))}
      <button onClick={() => clear()}>Clear</button>
    </ul>
  );
}
