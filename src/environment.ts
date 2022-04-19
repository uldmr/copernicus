import { Scene } from 'three';

import { Camera } from './camera';
import { ControlsRenderer, MainRenderer } from './renderers';

export class Environment {
  private _renderer: MainRenderer;
  private _controlsRenderer: ControlsRenderer;
  private _camera: Camera;

  constructor() {
    this._renderer = new MainRenderer();
    this._controlsRenderer = new ControlsRenderer();
    this._camera = new Camera(this._controlsRenderer.instance.domElement);

    window.addEventListener('resize', this.handleWindowResize);
  }

  public render(scene: Scene) {
    this._renderer.render(scene, this._camera.instance);
    this._controlsRenderer.render(scene, this._camera.instance);
  }

  // private methods

  private handleWindowResize = () => {
    this._camera.update();
    this._renderer.update();
    this._controlsRenderer.update();
  };
}
