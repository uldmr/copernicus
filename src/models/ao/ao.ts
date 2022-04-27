import { Constants } from '../../constants';
import { Converter } from '../../utils';
import { IParam, Param } from '../param';
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
  readonly type: AOType;

  /** The common name of the object  */
  readonly name: string;

  /** Mean radius of the object (Mm) */
  readonly radius: IParam<number>;

  /** Mean diameter of the object (Mm) */
  readonly diameter: number;

  /** General color of the object */
  readonly color?: number;

  /** Sidereal rotation period (Earth days) */
  readonly rotationPeriod?: number;

  /** Object's atosphere */
  readonly atmosphere?: IAtmosphere;

  /** Object's orbit */
  readonly orbit?: IOrbit;

  /** Object's satellites */
  readonly satellites?: IAO[];
}

export class AO implements IAO {
  public readonly type: AOType;
  public readonly name: string;
  public readonly radius: IParam<number>;
  public readonly diameter: number;
  public readonly rotationPeriod?: number;
  public readonly color?: number;
  public readonly orbit?: IOrbit;
  public readonly atmosphere?: IAtmosphere;
  public readonly satellites?: AO[];

  constructor(src?: any) {
    this.type = src?.type || AOType.Undefined;
    this.name = src?.name || '';
    this.radius = new Param({
      actual: Converter.fromMm(src?.radius?.actual || 0),
      simple: src?.radius?.simple || 0,
    });
    this.diameter = this.radius.value * 2;
    this.color = parseInt(src?.color) || Constants.ao.defaultColor;
    this.rotationPeriod = src?.rotationPeriod;
    this.orbit = src?.orbit ? new Orbit(src.orbit) : null;
    this.atmosphere = src?.atmosphere ? new Atmosphere(src.atmosphere) : null;
    this.satellites = src?.satellites?.map((o: any) => new AO(o)) || [];
  }
}
