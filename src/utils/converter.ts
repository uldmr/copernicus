import { MathUtils } from 'three';

import { Constants } from '../constants';

export class Converter {
  public static fromMm(value: number) {
    return value / Constants.units.distance;
  }

  public static toMm(value: number) {
    return value * Constants.units.distance;
  }

  public static fromDeg(value: number) {
    return MathUtils.degToRad(value);
  }

  public static toDeg(value: number) {
    return MathUtils.radToDeg(value);
  }

  public static fromDays(value: number) {
    return value * Constants.units.rotationPeriod;
  }

  public static toDays(value: number) {
    return value / Constants.units.rotationPeriod;
  }

  public static getSpeedFromPeriod(value: number) {
    return value ? (2 * Math.PI) / value : 0;
  }
}
