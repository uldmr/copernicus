import { Constants } from '../../constants';
import { Atmosphere, IAtmosphere } from './atmosphere';
import { IOrbit, Orbit } from './orbit';

export enum AOType {
  Asteroid = 'asteroid',
  Comet = 'comet',
  DwarfPlanet = 'dwarf planet',
  IceGiant = 'ice giant',
  GasGiant = 'gas giant',
  Sun = 'sun',
  Moon = 'moon',
  Planet = 'planet',
  RingSystem = 'ring system',
  Undefined = 'undefined',
}

/** Astronomical Object */
export interface IAO {
  /** Type of the object */
  type: AOType;

  /** The common name of the object  */
  name: string;

  /** Mean radius of the object (AU) */
  radius: number;

  /** General color of the object */
  color?: number;

  /** Sidereal rotation period (Earth days) */
  rotationPeriod?: number;

  /** Object's atosphere */
  atmosphere?: IAtmosphere;

  /** Object's orbit */
  orbit?: IOrbit;

  /** Object's satellites */
  satellites?: IAO[];
}

export class AO implements IAO {
  public type: AOType;
  public name: string;
  public radius: number;
  public rotationPeriod?: number;
  public color?: number;
  public orbit?: IOrbit;
  public atmosphere?: IAtmosphere;
  public satellites?: AO[];

  constructor(src?: any) {
    this.type = src?.type || AOType.Undefined;
    this.name = src?.name || '';
    this.radius = src?.radius || 0;
    this.color = parseInt(src?.color) || Constants.ao.defaultColor;
    this.rotationPeriod = src?.rotationPeriod;
    this.orbit = new Orbit(src.orbit);
    this.atmosphere = new Atmosphere(src.atmosphere);
    this.satellites = src?.satellites?.map((o: any) => new AO(o)) || [];
  }
}
