import * as THREE from 'three';

import { CameraChangeHandler } from './camera';
import { Constants } from './constants';
import { Environment } from './environment';

type TickHandler = (elapsed: number) => void;

export class Scene {
  private _env: Environment;
  private _scene: THREE.Scene;
  private _clock = new THREE.Clock();
  private _tickHandlers: TickHandler[] = [];

  constructor() {
    this._scene = new THREE.Scene();
    this._env = new Environment(this._scene);

    this.buildDeepSpace();
  }

  public add(...object: THREE.Object3D<THREE.Event>[]) {
    this._scene.add(...object);
  }

  public run = () => {
    this._scene.traverse(this.disposeMaterial);
    this.tick();
  };

  public onTick(handler: TickHandler) {
    this._tickHandlers.push(handler);
  }

  public onCameraChange(handler: CameraChangeHandler) {
    this._env.onCameraChange(handler);
  }

  public get camera() {
    return this._env.camera;
  }

  // private methods

  private buildDeepSpace() {
    const cubeTextureLoader = new THREE.CubeTextureLoader();
    this._scene.background = cubeTextureLoader.load([
      Constants.scene.bg,
      Constants.scene.bg,
      Constants.scene.bg,
      Constants.scene.bg,
      Constants.scene.bg,
      Constants.scene.bg,
    ]);
  }

  private tick = () => {
    requestAnimationFrame(this.tick);
    const elapsed = this._clock.getElapsedTime();
    this._tickHandlers.forEach((handler) => {
      handler(elapsed);
    });

    this._env.render();
  };

  private disposeMaterial(obj: any) {
    if (obj.material) {
      obj.material.dispose();
    }
  }
}
