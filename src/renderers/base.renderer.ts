import { Camera, Scene } from 'three';

export interface IBaseRenderer {
  render: (scene: Scene, camera?: Camera) => void;
  update: () => void;
}

export abstract class BaseRenderer<T> implements IBaseRenderer {
  protected _renderer: T;

  public get instance() {
    return this._renderer;
  }

  public abstract render(scene: Scene, camera?: Camera): void;

  public abstract update(): void;
}
