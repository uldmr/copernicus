import * as THREE from 'three';

import { Constants } from '../../constants';
import { IOrbit } from '../../models';
import { BaseBuilder } from '../base.builder';

export class OrbitBuilder extends BaseBuilder<IOrbit, THREE.Line> {
  public build(o: IOrbit, center?: THREE.Vector3) {
    const geo = this.getGeometry(o, center);
    const mat = new THREE.LineBasicMaterial({ color: Constants.ao.orbit.color, side: THREE.DoubleSide });
    const orbit = new THREE.Line(geo, mat);
    orbit.rotation.set(THREE.MathUtils.degToRad(Constants.ao.orbit.inclination), 0, 0);
    return orbit;
  }

  public getPath(o: IOrbit, center?: THREE.Vector3) {
    const points = this.getPoints(o, center);
    return new THREE.Path(points);
  }

  private getGeometry(o: IOrbit, center?: THREE.Vector3) {
    const points = this.getPoints(o, center);
    return new THREE.BufferGeometry().setFromPoints(points);
  }

  private getPoints(o: IOrbit, center: THREE.Vector3 = Constants.scene.center) {
    const curve = new THREE.EllipseCurve(
      center.x + o.aphelion.value - o.perihelion.value,
      center.y + 0,
      o.semiMajorAxis,
      o.semiMinorAxis,
      0,
      2 * Math.PI,
      false,
      0
    );
    return curve.getPoints(360);
  }
}
