import * as THREE from 'three';

import { CameraChangeHandler } from './camera';
import { Constants } from './constants';
import { Environment } from './environment';
import { Window } from './utils';

type TickHandler = (elapsed: number) => void;
type ObjectClickHandler = () => void;

export class Scene {
  private _env: Environment;
  private _scene: THREE.Scene;
  private _clock = new THREE.Clock();
  private _tickHandlers: TickHandler[] = [];
  private _raycaster: THREE.Raycaster;
  private _pointer: THREE.Vector2;
  private _interactionObjects: Map<THREE.Object3D, ObjectClickHandler>;

  constructor() {
    this._scene = new THREE.Scene();
    this._env = new Environment(this._scene);
    this._raycaster = new THREE.Raycaster();
    this._pointer = new THREE.Vector2(0, 0);
    this._interactionObjects = new Map();

    this.buildDeepSpace();

    window.addEventListener('pointermove', this.handlePointerMove);
    window.addEventListener('pointerdown', this.handlePointerDown);
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
    this._raycaster.setFromCamera(this._pointer, this.camera.instance);
  }

  public onObjectClick(obj: THREE.Object3D, callback: ObjectClickHandler) {
    this._interactionObjects.set(obj, callback);
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
    setTimeout(() => {
      requestAnimationFrame(this.tick);
    }, 1);
    const elapsed = this._clock.getElapsedTime();
    this._tickHandlers.forEach((handler) => {
      handler(elapsed);
    });

    this._raycaster.setFromCamera(this._pointer, this.camera.instance);

    // const intersects = this._raycaster.intersectObjects(this._scene.children, true);

    // if (intersects.length > 0) {
    //   intersects[0].object.visible = false;
    // } else {
    //   this._scene.children.forEach((s) => {
    //     s.visible = true;
    //   });
    // }

    this._env.render();
  };

  private disposeMaterial(obj: any) {
    if (obj.material) {
      obj.material.dispose();
    }
  }

  private handlePointerMove = (e: PointerEvent) => {
    this._pointer.x = (e.clientX / Window.width) * 2 - 1;
    this._pointer.y = (e.clientY / Window.height) * 2 - 1;
  };

  private handlePointerDown = (e: PointerEvent) => {
    this._pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    this._pointer.y = (e.clientY / window.innerHeight) * 2 - 1;

    // Array.from(this._interactionObjects.keys()).forEach((key) => {
    //   const obj = this._scene.getObjectById(key.id);
    //   if (obj) {
    //     const intersections = this._raycaster.intersectObject(obj);
    //     if (intersections.length) {
    //       this._interactionObjects.get(key)();
    //     }
    //   }
    // });
  };
}
