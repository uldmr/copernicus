/** Orbit of Astronomical Object (AO)  */
export interface IOrbit {
  /** Eccentricity */
  e: number;

  /** Orbital sidereal period (Earth days) */
  period: number;

  /** Farthest point in the orbit of the object about its primary object (AU) */
  aphelion?: number;

  /** Nearest point in the orbit of the object about its primary object (AU) */
  perihelion?: number;
}

export class Orbit implements IOrbit {
  public e: number;
  public period: number;
  public aphelion?: number;
  public perihelion?: number;

  constructor(src?: any) {
    this.e = Math.abs(src?.e || 0);
    this.period = src?.period || 0;
    this.aphelion = src?.aphelion || 0;
    this.perihelion = src?.perihelion || 0;
  }
}
