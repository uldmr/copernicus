import { Scene } from '../scene';

/**
 *  Base Builder
 *
 * @export
 * @interface IBaseBuilder
 * @template T Object model type to build
 * @template R Result object type
 */
export interface IBaseBuilder<T, R> {
  build: (o: T) => R;
}

export abstract class BaseBuilder<T, R> implements IBaseBuilder<T, R> {
  constructor(protected scene: Scene) {}

  public abstract build(o: T): R;
}
