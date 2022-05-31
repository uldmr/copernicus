import { Constants } from '../../constants';
import { Converter } from '../../utils';
import { IParam, Param } from '../param';
import { Atmosphere, IAtmosphere } from './atmosphere';
import { IOrbit, Orbit } from './orbit';
import { IRing, Ring } from './ring';

export enum AOType {
  Asteroid = 'asteroid',
  Comet = 'comet',
  DwarfPlanet = 'dwarf planet',
  IceGiant = 'ice giant',
  GasGiant = 'gas giant',
  Sun = 'sun',
  Moon = 'moon',
  Planet = 'planet',
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

  /** Ring system of the AO */
  readonly ringSystem?: IRing[];

  /** Mark as lost */
  readonly lost?: boolean;

  /** Axial tilt (deg) */
  readonly axialTilt?: number;

  /** Rotation speed (rad/ms) */
  readonly speed?: number;
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
  public readonly ringSystem?: Ring[];
  public readonly lost?: boolean;
  public readonly axialTilt?: number;
  public readonly speed?: number;

  constructor(src?: any) {
    this.type = src?.type || AOType.Undefined;
    this.name = src?.name || '';
    this.radius = new Param({
      actual: Converter.fromMm(src?.radius?.actual || 0),
      simple: src?.radius?.simple || 0,
    });
    this.diameter = this.radius.value * 2;
    this.color = parseInt(src?.color) || Constants.ao.defaultColor;
    this.orbit = src?.orbit ? new Orbit(src.orbit) : null;
    this.rotationPeriod = Converter.fromDays(src?.rotationPeriod || this.orbit?.period || 0);
    this.atmosphere = src?.atmosphere ? new Atmosphere(src.atmosphere) : null;
    this.satellites = src?.satellites?.map((o: any) => new AO(o)) || [];
    this.ringSystem = src?.ringSystem?.map((r: any) => new Ring(r)) || [];
    this.lost = src?.lost;
    this.axialTilt = Converter.fromDeg(src?.axialTilt || 0);
    this.speed = Converter.getSpeedFromPeriod(this.rotationPeriod);
  }
}
