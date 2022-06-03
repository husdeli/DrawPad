import { render } from "preact";
import { App } from "./app";

import "hammerjs";

import "./index.css";

render(<App />, document.getElementById("app")!);
