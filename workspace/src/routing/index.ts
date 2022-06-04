export const HOME = "/";
export const CANVAS_ROUTE = "canvas";

export function getCanvasLink(id: string) {
  return `${CANVAS_ROUTE}/${id}`;
}

export function getHomeLink() {
  return HOME;
}
