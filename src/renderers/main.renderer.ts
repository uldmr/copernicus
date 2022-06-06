import { Camera, ReinhardToneMapping, Scene, WebGLRenderer } from 'three';
import { Constants } from '../constants';

import { Window } from '../utils';
import { BaseRenderer } from './base.renderer';

export class MainRenderer extends BaseRenderer<WebGLRenderer> {
  constructor() {
    super();
    this._renderer = new WebGLRenderer({
      antialias: true,
    });
    this._renderer.setPixelRatio(Window.dpr);
    this._renderer.shadowMap.enabled = true;
    this._renderer.shadowMap.autoUpdate = true;
    if (Constants.mode === 'actual') {
      this._renderer.toneMapping = ReinhardToneMapping;
    }
    this.update();
    document.body.appendChild(this._renderer.domElement);
  }

  public render(scene: Scene, camera: Camera) {
    this._renderer.render(scene, camera);
  }

  public update() {
    this._renderer.setSize(Window.width, Window.height);
  }
}
