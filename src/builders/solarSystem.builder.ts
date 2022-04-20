import { IAO, ISolarSystem } from '../models';
import { Scene } from '../scene';
import { AOBuilder } from './ao/ao.builder';
import { BaseBuilder, IBaseBuilder } from './base.builder';

export class SolarSystemBuilder extends BaseBuilder<ISolarSystem, any> {
  private _aoBuilder: IBaseBuilder<IAO, any>;

  constructor(scene: Scene) {
    super(scene);
    this._aoBuilder = new AOBuilder(scene);
  }

  public build(system: ISolarSystem) {
    system.objects.forEach((o) => {
      this._aoBuilder.build(o);
    });
  }
}
