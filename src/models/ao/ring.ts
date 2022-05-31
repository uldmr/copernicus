import { Constants } from '../../constants';
import { Converter } from '../../utils';
import { IParam, Param } from '../param';

export enum RingType {
  Ring = 'ring',
  Ringlet = 'ringlet',
  Gap = 'gap',
}

/** Ring of Astronomical Object (AO)  */
export interface IRing {
  /** Type of the ring */
  readonly type: RingType;

  /** The common name of the ring */
  readonly name: string;

  /** Mean radius of the ring (Mm) */
  readonly radius: IParam<number>;

  /** Width of the ring (Mm) */
  readonly width: IParam<number>;

  /** Thickness of the ring (Mm) */
  readonly thickness: IParam<number>;

  /** Optical depth */
  readonly opticalDepth?: number;

  /** General color of the ring */
  readonly color?: number;

  /** Ring parts */
  readonly parts?: Ring[];
}

export class Ring implements IRing {
  public readonly type: RingType;
  public readonly name: string;
  public readonly radius: IParam<number>;
  public readonly width: IParam<number>;
  public readonly thickness: IParam<number>;
  public readonly opticalDepth?: number;
  public readonly color?: number;
  public readonly parts?: Ring[];

  constructor(src?: any) {
    this.type = src?.type || RingType.Ring;
    this.name = src?.name || '';
    this.radius = new Param({
      actual: Converter.fromMm(src?.radius?.actual || 0),
      simple: src?.radius?.simple || 0,
    });
    this.width = new Param({
      actual: Converter.fromMm(src?.width?.actual || 0),
      simple: src?.width?.simple || 0,
    });
    this.thickness = new Param({
      actual: Converter.fromMm(src?.thickness?.actual || 0),
      simple: src?.thickness?.simple || 0,
    });
    this.opticalDepth = src?.opticalDepth;
    this.color = parseInt(src?.color);
    this.parts = src.parts?.map((p) => new Ring(p)) || [];
  }
}
