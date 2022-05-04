import { Scene } from 'three';

import { Camera, CameraChangeHandler } from './camera';
import { Constants } from './constants';
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

    this._renderers = [controlsRenderer, mainRenderer];

    if (Constants.mode === 'actual') {
      const bloomRenderer = new BloomRenderer(mainRenderer.instance, scene, this._camera.instance);
      this._renderers.push(bloomRenderer);
    }

    window.addEventListener('resize', this.handleWindowResize);
  }

  public render() {
    this._camera.update();
    this._renderers.forEach((renderer) => {
      renderer.render(this._scene, this._camera.instance);
    });
  }

  public onCameraChange(handler: CameraChangeHandler) {
    this._camera.onChange(handler);
  }

  public get camera() {
    return this._camera;
  }

  // private methods

  private handleWindowResize = () => {
    this._camera.update();
    this._renderers.forEach((renderer) => {
      renderer.update();
    });
  };
}
