import * as THREE from 'three';
import { Constants } from '../../constants';

import { IAO } from '../../models';
import { BaseBuilder } from '../base.builder';

enum Axis {
  x,
  y,
  z,
}

export class AxesBuilder extends BaseBuilder<IAO, THREE.Group> {
  public build(o: IAO): THREE.Group {
    const group = new THREE.Group();

    Array.from(Object.keys(Axis)).forEach((a) => {
      const axis = this.buildAxis(o, Axis[a]);
      group.add(axis);
    });

    return group;
  }

  private buildAxis(o: IAO, axis: Axis) {
    const lineWidth = o.radius.value * Constants.ao.axes.widthFactor;
    let color: THREE.ColorRepresentation;
    let points: THREE.Vector3[] = [new THREE.Vector3(0, 0, 0)];

    switch (axis) {
      case Axis.x:
        color = Constants.ao.axes.x.color;
        points.push(new THREE.Vector3(lineWidth, 0, 0));
        break;
      case Axis.y:
        color = Constants.ao.axes.y.color;
        points.push(new THREE.Vector3(0, lineWidth, 0));
        break;
      case Axis.z:
        color = Constants.ao.axes.z.color;
        points.push(new THREE.Vector3(0, 0, lineWidth));
        break;
    }

    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({ color, side: THREE.DoubleSide, opacity: 0.5, transparent: true });

    return new THREE.Line(geo, mat);
  }
}
