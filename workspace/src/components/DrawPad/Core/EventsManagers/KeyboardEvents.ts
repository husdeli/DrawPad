type SpaceLockStart = () => void;
type SpaceLockFinish = () => void;

export class KeyboardEvents {
  private _onSpaceLock: SpaceLockStart = () => undefined;
  private _onSpaceUnlock: SpaceLockFinish = () => undefined;

  private _spaceLocked = false;

  get spaceLocked() {
    return this._spaceLocked;
  }

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

    const onKeyDown = (event: KeyboardEvent) => {
      // Space pressed - start event
      if (!this._spaceLocked && event.key === eventKey) {
        this._spaceLocked = true;
        this._onSpaceLock();

        const onKeyUp = (event: KeyboardEvent) => {
          // Space unpressed - finish event
          if (event.key === eventKey) {
            this._spaceLocked = false;
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
