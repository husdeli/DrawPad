import { h } from "preact";
import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import { DrawPad } from "./components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage } from "./components/MainPage/MainPage";
import { CANVAS_ROUTE, HOME } from "./routing";

const sessionId = window.crypto.randomUUID();

export function App() {
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const containerRef = useRef<null | HTMLElement>(null);

  useEffect(() => {
    setContainer(containerRef.current);
    return () => setContainer(null);
  }, [containerRef.current]);

  return (
    <>
      <header />

      <main ref={containerRef} class="bg-slate-50 h-full w-full">
        <BrowserRouter>
          <Routes>
            <Route
              path={HOME}
              element={<MainPage title="Draw pad" sessionId={sessionId} />}
            />

            <Route
              path={`${CANVAS_ROUTE}/:sessionId`}
              element={container && <DrawPad container={container} />}
            />
          </Routes>
        </BrowserRouter>
      </main>

      <footer />
    </>
  );
}
