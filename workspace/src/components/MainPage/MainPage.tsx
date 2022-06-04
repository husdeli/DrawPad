import { getCanvasLink } from "../../routing";

interface Props {
  title: string;
  sessionId: string;
}

export function MainPage({ title, sessionId }: Props) {
  return (
    <section className="flex flex-col h-full d-flex items-center justify-center">
      <h1 className="text-6xl font-sans font-black -mt-28">{title}</h1>
      <div className="mt-4">
        <a
          className="text-lg font-thin bg-primary-500 px-4 py-2 text-slate-100 rounded-sm"
          href={getCanvasLink(sessionId)}
        >
          Start drawing
        </a>
      </div>
    </section>
  );
}
