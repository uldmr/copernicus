import { Camera, Object3D, Scene, WebGLRenderer } from 'three';

import { Window } from '../utils';

export class MainRenderer {
  private _renderer: WebGLRenderer;

  constructor() {
    this._renderer = new WebGLRenderer({
      antialias: true,
    });
    this._renderer.setPixelRatio(Window.dpr);
    this.update();
    document.body.appendChild(this._renderer.domElement);
  }

  public get instance() {
    return this._renderer;
  }

  public update() {
    this._renderer.setSize(Window.width, Window.height);
  }

  public render(scene: Scene, camera: Camera) {
    this._renderer.render(scene, camera);
  }
}
