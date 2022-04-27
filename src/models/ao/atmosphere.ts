import { Constants } from '../../constants';

/** Atmosphere of Astronomical Object (AO) */
export interface IAtmosphere {
  /** Main color of atmosphere */
  readonly color: number;
}

export class Atmosphere implements IAtmosphere {
  public readonly color: number;

  constructor(src?: any) {
    this.color = parseInt(src?.color) || Constants.ao.atmosphere.color;
  }
}
