import { PerspectiveCamera } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { Window } from './utils';

export class Camera {
  private _cam: PerspectiveCamera;
  private _controls: OrbitControls;

  constructor(domElement?: HTMLElement) {
    this.initCamera();
    this.initControls(domElement);
  }

  public get instance() {
    return this._cam;
  }

  public update() {
    this._cam.aspect = Window.aspect;
    this._cam.updateProjectionMatrix();
  }

  // private methods

  private initCamera() {
    this._cam = new PerspectiveCamera(60, Window.aspect, 0.1, 100000);
    this._cam.position.set(50, 60, 1);
  }

  private initControls(domElement?: HTMLElement) {
    this._controls = new OrbitControls(this._cam, domElement);
    this._controls.zoomSpeed = 1;
    this._controls.autoRotate = true;
    this._controls.autoRotateSpeed = 2;
  }
}
