export class Window {
  public static get height() {
    return window.innerHeight;
  }

  public static get width() {
    return window.innerWidth;
  }

  public static get aspect() {
    return Window.width / Window.height;
  }

  public static get dpr() {
    return window.devicePixelRatio;
  }
}
