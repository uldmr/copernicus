import { AO, IAO } from './ao/ao';

export interface ISolarSystem {
  objects: IAO[];
}

export class SolarSystem implements ISolarSystem {
  public objects: IAO[] = [];

  constructor(data?: any) {
    if (data?.objects) {
      this.objects = data.objects.map((o: any) => new AO(o));
    }
  }
}
