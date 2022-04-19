import { Camera, Object3D, Scene } from 'three';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

import { Window } from '../utils';

export class ControlsRenderer {
  private _renderer: CSS2DRenderer;

  constructor() {
    this._renderer = new CSS2DRenderer();
    this.update();
    this._renderer.domElement.style.position = 'absolute';
    this._renderer.domElement.style.top = '0px';
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
