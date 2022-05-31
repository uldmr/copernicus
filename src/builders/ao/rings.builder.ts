import * as THREE from 'three';

import { IRing, RingType } from '../../models';
import { BaseBuilder } from '../base.builder';

export class RingsBuilder extends BaseBuilder<IRing[], THREE.Group> {
  public build(ringSystem: IRing[]) {
    const group = new THREE.Group();
    ringSystem.forEach((r) => {
      if (r.parts.length) {
        this.buildGaps(r, group);
        this.buildRinglets(r, group);
      } else {
        const obj = this.buildRing(r);
        group.add(obj);
      }
    });

    return group;
  }

  private buildGaps(ring: IRing, group: THREE.Group) {
    const { color, opticalDepth, radius, width, parts } = ring;
    let fillRadius = radius.value;
    let fillWidth = 0;
    parts
      .filter((p) => p.type === RingType.Gap)
      .forEach((g) => {
        fillWidth = g.radius.value - fillRadius;
        const obj = this.buildRingByParams(fillRadius, fillWidth, color, opticalDepth);
        group.add(obj);
        fillRadius = g.radius.value + g.width.value;
      });
    const finalRingWidth = radius.value + width.value - fillRadius;
    if (finalRingWidth >= 0) {
      const obj = this.buildRingByParams(fillRadius, finalRingWidth, color, opticalDepth);
      group.add(obj);
    }
  }

  private buildRinglets(ring: IRing, group: THREE.Group) {
    const { color, opticalDepth, parts } = ring;
    parts
      .filter((p) => p.type === RingType.Ringlet)
      .forEach((ringlet) => {
        const obj = this.buildRingByParams(ringlet.radius.value, ringlet.width.value, ringlet.color || color, ringlet.color || opticalDepth);
        group.add(obj);
      });
  }

  private buildRing(r: IRing) {
    return this.buildRingByParams(r.radius.value, r.width.value, r.color, r.opticalDepth);
  }

  private buildRingByParams(radius: number, width: number, color: number, opticalDepth: number) {
    const geo = new THREE.RingGeometry(radius, radius + width, 360, 360, 2 * Math.PI, 2 * Math.PI);
    const mat = new THREE.MeshBasicMaterial({
      color: color,
      side: THREE.DoubleSide,
      opacity: color ? opticalDepth * 10 : 0,
      transparent: true,
    });
    const obj = new THREE.Mesh(geo, mat);
    return obj;
  }
}
