type SpaceLockStart = () => void;
type SpaceLockFinish = () => void;

export class KeyboardEvents {
  private _onSpaceLock: SpaceLockStart = () => undefined;
  private _onSpaceUnlock: SpaceLockFinish = () => undefined;

  constructor(private element: Window) {
    this.initialize();
  }

  registerSpaceLock = (lock: SpaceLockStart, unlock: SpaceLockFinish) => {
    this._onSpaceLock = lock;
    this._onSpaceUnlock = unlock;
  };

  private initialize = () => {
    this.subscribeOnSpaceLock();
  };

  private subscribeOnSpaceLock = () => {
    const eventKey = " ";

    let spaceLocked = false;

    const onKeyDown = (event: KeyboardEvent) => {
      // Space pressed - start event
      if (!spaceLocked && event.key === eventKey) {
        spaceLocked = true;
        this._onSpaceLock();

        const onKeyUp = (event: KeyboardEvent) => {
          // Space unpressed - finish event
          if (event.key === eventKey) {
            spaceLocked = false;
            this._onSpaceUnlock();
            this.element.removeEventListener("keyup", onKeyUp);
          }
        };
        this.element.addEventListener("keyup", onKeyUp);
      }
    };

    this.element.addEventListener("keydown", onKeyDown);
    return () => this.element.removeEventListener("keydown", onKeyDown);
  };
}
