import { Converter } from '../../utils';
import { IParam, Param } from '../param';

/** Orbit of Astronomical Object (AO)  */
export interface IOrbit {
  /** Eccentricity */
  readonly e: number;

  /** Orbital sidereal period (Earth days) */
  readonly period: number;

  /** Farthest point in the orbit of the object about its primary object (Mm) */
  readonly aphelion?: IParam<number>;

  /** Nearest point in the orbit of the object about its primary object (Mm) */
  readonly perihelion?: IParam<number>;

  /** Longest radius of the orbit (Mm) */
  readonly semiMajorAxis?: number;

  /** Shortest radius of the orbit (Mm) */
  readonly semiMinorAxis?: number;

  /** Inclination to the Sun's equator (deg) */
  readonly inclination?: number;

  /** Orbital speed (Mm/s) */
  readonly speed?: number;
}

export class Orbit implements IOrbit {
  public readonly e: number;
  public readonly period: number;
  public readonly aphelion?: IParam<number>;
  public readonly perihelion?: IParam<number>;
  public readonly semiMajorAxis?: number;
  public readonly semiMinorAxis?: number;
  public readonly inclination?: number;
  public readonly speed?: number;

  constructor(src?: any) {
    this.e = Math.abs(src?.e || 0);
    this.period = src?.period || 0;
    this.aphelion = new Param({
      actual: Converter.fromMm(src?.aphelion?.actual || 0),
      simple: src?.aphelion?.simple || 0,
    });
    this.perihelion = new Param({
      actual: Converter.fromMm(src?.perihelion?.actual || 0),
      simple: src?.perihelion?.simple || 0,
    });
    this.semiMajorAxis = (this.aphelion.value + this.perihelion.value) / 2;
    this.semiMinorAxis = this.semiMajorAxis * Math.sqrt(1 - Math.pow(this.e, 2));
    this.inclination = Converter.fromDeg(src?.inclination || 0);
    this.speed = this.period ? (2 * Math.PI) / this.period : 0;
  }
}
