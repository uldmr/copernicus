import { PerspectiveCamera } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Constants } from './constants';

import { Window } from './utils';

export type CameraChangeHandler = (camera: PerspectiveCamera) => void;

export class Camera {
  private _cam: PerspectiveCamera;
  private _controls: OrbitControls;
  private _cameraChangeHandlers: CameraChangeHandler[] = [];

  constructor(domElement?: HTMLElement) {
    this.initCamera();
    this.initControls(domElement);
  }

  public get controls() {
    return this._controls;
  }

  public get instance() {
    return this._cam;
  }

  public update() {
    this._cam.aspect = Window.aspect;
    this._cam.updateProjectionMatrix();
    this._controls.update();
  }

  public onChange(handlers: CameraChangeHandler) {
    this._cameraChangeHandlers.push(handlers);
  }

  // private methods

  private initCamera() {
    this._cam = new PerspectiveCamera(Constants.camera.fov, Window.aspect, Constants.camera.near, Constants.camera.far);
    this._cam.position.set(Constants.camera.defaultPos.x, Constants.camera.defaultPos.y, Constants.camera.defaultPos.z);
  }

  private initControls(domElement?: HTMLElement) {
    this._controls = new OrbitControls(this._cam, domElement);
    this._controls.zoomSpeed = 1;
    this._controls.minDistance = Constants.zoom.min;
    this._controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    this._controls.dampingFactor = 0.05;
    this._controls.listenToKeyEvents(window as any);
    this._controls.addEventListener('change', (e) => {
      this._cameraChangeHandlers.forEach((handler) => {
        handler(this._cam);
        this.update();
      });
    });
  }
}
