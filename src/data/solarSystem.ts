import { AO } from '../models';
import { Scene } from '../scene';
import { Mercury } from './planets';

const Sun = new AO();
Sun.name = 'Sun';
Sun.radius = 1;
Sun.rotationPeriod = 1;
Sun.isStar = true;
Sun.satellites = [Mercury];

export class SolarSystem {
  public static build(scene: Scene) {
    Sun.build(scene);
  }
}
