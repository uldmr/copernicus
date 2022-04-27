import * as THREE from 'three';

import { Constants } from '../../constants';
import { IOrbit } from '../../models';
import { BaseBuilder } from '../base.builder';

export class OrbitBuilder extends BaseBuilder<IOrbit, THREE.Line> {
  public build(o: IOrbit) {
    const geo = this.getGeometry(o);
    const mat = new THREE.LineBasicMaterial({ color: Constants.ao.orbit.color, side: THREE.DoubleSide });
    const orbit = new THREE.Line(geo, mat);
    orbit.rotation.set(THREE.MathUtils.degToRad(Constants.ao.orbit.inclination), 0 /*TODO: use o.inclination*/, 0);
    this.scene.add(orbit);
    return orbit;
  }

  public getPath(o: IOrbit) {
    const points = this.getPoints(o);
    return new THREE.Path(points);
  }

  private getGeometry(o: IOrbit) {
    const points = this.getPoints(o);
    return new THREE.BufferGeometry().setFromPoints(points);
  }

  private getPoints(o: IOrbit) {
    const curve = new THREE.EllipseCurve(o.aphelion.value - o.perihelion.value, 0, o.semiMajorAxis, o.semiMinorAxis, 0, 2 * Math.PI, false, 0);
    return curve.getPoints(360);
  }
}
