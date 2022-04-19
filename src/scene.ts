import * as THREE from 'three';

import { Environment } from './environment';

type TickHandler = (elapsed: number) => void;

export class Scene {
  private _env: Environment;
  private _scene: THREE.Scene;
  private _clock = new THREE.Clock();
  private _tickHandlers: TickHandler[] = [];

  constructor() {
    this._env = new Environment();
    this._scene = new THREE.Scene();
    this.setBackground();
  }

  public add(...object: THREE.Object3D<THREE.Event>[]) {
    this._scene.add(...object);
  }

  public run = () => {
    this.tick();
  };

  public onTick(handler: TickHandler) {
    this._tickHandlers.push(handler);
  }

  // private methods

  private setBackground() {
    const cubeTextureLoader = new THREE.CubeTextureLoader();
    this._scene.background = cubeTextureLoader.load([
      '/textures/stars.jpg',
      '/textures/stars.jpg',
      '/textures/stars.jpg',
      '/textures/stars.jpg',
      '/textures/stars.jpg',
      '/textures/stars.jpg',
    ]);
  }

  private tick = () => {
    requestAnimationFrame(this.tick);
    const elapsed = this._clock.getElapsedTime();
    this._tickHandlers.forEach((handler) => {
      handler(elapsed);
    });
    this._env.render(this._scene);
  };
}
