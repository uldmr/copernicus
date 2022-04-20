import { Scene } from 'three';

import { Camera } from './camera';
import { BloomRenderer, ControlsRenderer, MainRenderer, IBaseRenderer } from './renderers';

export class Environment {
  private _camera: Camera;
  private _scene: Scene;
  private _renderers: IBaseRenderer[] = [];

  constructor(scene: Scene) {
    const controlsRenderer = new ControlsRenderer();
    const mainRenderer = new MainRenderer();

    this._scene = scene;
    this._camera = new Camera(controlsRenderer.instance.domElement);

    const bloomRenderer = new BloomRenderer(mainRenderer.instance, scene, this._camera.instance);
    this._renderers = [controlsRenderer, mainRenderer, bloomRenderer];

    window.addEventListener('resize', this.handleWindowResize);
  }

  public render() {
    this._renderers.forEach((renderer) => {
      renderer.render(this._scene, this._camera.instance);
    });
  }

  // private methods

  private handleWindowResize = () => {
    this._camera.update();
    this._renderers.forEach((renderer) => {
      renderer.update();
    });
  };
}
