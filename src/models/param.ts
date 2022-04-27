import { Constants } from '../constants';

export interface IParam<T> {
  readonly actual: T;
  readonly simple: T;
  get value(): T;
}

export class Param<T> implements IParam<T> {
  public readonly actual: T;
  public readonly simple: T;

  constructor(src?: any) {
    this.actual = src?.actual as T;
    this.simple = src?.simple as T;
  }

  public get value() {
    return this[Constants.mode];
  }
}
