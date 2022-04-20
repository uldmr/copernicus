import { Camera, Object3D, Scene } from 'three';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

import { Window } from '../utils';
import { BaseRenderer } from './base.renderer';

export class ControlsRenderer extends BaseRenderer<CSS2DRenderer> {
  constructor() {
    super();
    this._renderer = new CSS2DRenderer();
    this.update();
    this._renderer.domElement.style.position = 'absolute';
    this._renderer.domElement.style.top = '0px';
    document.body.appendChild(this._renderer.domElement);
  }

  public update() {
    this._renderer.setSize(Window.width, Window.height);
  }

  public render(scene: Scene, camera: Camera) {
    this._renderer.render(scene, camera);
  }
}
