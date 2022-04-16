import { h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { DrawPad } from "./components";
import { LoggerProvider } from "./components/DrawPad/Logger/logger.provider";

export function App() {
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const containerRef = useRef<null | HTMLElement>(null);

  useEffect(() => {
    setContainer(containerRef.current);
    return () => setContainer(null);
  }, [containerRef.current]);

  return (
    <LoggerProvider>
      <header />
      <main ref={containerRef} class="bg-white h-full w-full">
        {container && <DrawPad container={container} />}
      </main>
      <footer />
    </LoggerProvider>
  );
}
