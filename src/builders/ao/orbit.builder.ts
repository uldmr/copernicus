import * as THREE from 'three';

import { Constants } from '../../constants';
import { IOrbit } from '../../models';
import { BaseBuilder } from '../base.builder';

export class OrbitBuilder extends BaseBuilder<IOrbit, THREE.Mesh> {
  public build(o: IOrbit, aoRadius?: number) {
    // TODO: Build ellipse using eccentricity, aphelion, and perihelion
    const geo = new THREE.TorusGeometry(o.aphelion, aoRadius / Constants.ao.orbit.widthFactor, 30, 200);
    const mat = new THREE.MeshBasicMaterial({ color: Constants.ao.orbit.color, side: THREE.DoubleSide });
    const orbit = new THREE.Mesh(geo, mat);
    // TODO: Use real orbital inclination
    orbit.rotation.set(THREE.MathUtils.degToRad(Constants.ao.orbit.inclination), 0, 0);
    this.scene.add(orbit);
    return orbit;
  }
}
