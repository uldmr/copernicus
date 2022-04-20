import { Constants } from '../../constants';

/** Atmosphere of Astronomical Object (AO) */
export interface IAtmosphere {
  /** Main color of atmosphere */
  color: number;
}

export class Atmosphere implements IAtmosphere {
  public color: number;

  constructor(src?: any) {
    this.color = parseInt(src?.color) || Constants.ao.atmosphere.color;
  }
}
