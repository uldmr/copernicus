/** Astronomical Object Orbit */
export class AOOrbit {
  /** Eccentricity */
  public e: number;

  /** Orbital sidereal period (days) */
  public period: number;

  /** Farthest point in the orbit of the object about its primary object (AU) */
  public aphelion?: number;

  /** Nearest point in the orbit of the object about its primary object (AU) */
  public perihelion?: number;
}
