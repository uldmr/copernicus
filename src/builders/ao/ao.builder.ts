import * as THREE from 'three';
import { Constants } from '../../constants';

import { AOType, IAO } from '../../models';
import { Scene } from '../../scene';
import { BaseBuilder } from '../base.builder';
import { LabelBuilder } from '../label.builder';
import { OrbitBuilder } from './orbit.builder';

export class AOBuilder extends BaseBuilder<IAO, THREE.Group> {
  private _orbitBuilder: OrbitBuilder;
  private _labelBuilder: LabelBuilder;

  constructor(scene: Scene) {
    super(scene);
    this._orbitBuilder = new OrbitBuilder(scene);
    this._labelBuilder = new LabelBuilder(scene);
  }

  public build(o: IAO, center?: THREE.Vector3) {
    const group = new THREE.Group();
    const obj = this.buildAO(o, center);
    group.add(obj);

    if (o.satellites) {
      o.satellites.map((s) => {
        group.add(this.build(s, obj.position));
      });
    }

    if (o.orbit) {
      const orbit = this._orbitBuilder.build(o.orbit, center);
      const path = this._orbitBuilder.getPath(o.orbit, center);
      const initialPos = Math.random();
      
      this.scene.onTick((elapsed) => {
        const point = path.getPoint(1 - ((elapsed / o.orbit.period + initialPos) % 1));
        obj.position.set(point.x, 0, point.y);
        group.position.set(center.x, center.y, center.z);
      });
      group.rotation.set(center.x + 0, center.y + 0, center.z + o.orbit.inclination);
      group.add(orbit);
    }

    this.scene.add(group);
    return group;
  }

  // private methods

  private buildAO(o: IAO, center?: THREE.Vector3) {
    switch (o.type) {
      case AOType.Sun:
        return this.buildSun(o);
      case AOType.DwarfPlanet:
      case AOType.GasGiant:
      case AOType.IceGiant:
      case AOType.Moon:
      case AOType.Planet:
        return this.buildPlanet(o, center);
      default:
        return this.buildDefault(o, center);
    }
  }

  private buildOrbit(group: THREE.Group, ao: IAO) {

  }

  private buildSun(o: IAO) {
    const group = new THREE.Group();
    const geo = new THREE.IcosahedronGeometry(o.radius.value, 32);
    const mat = new THREE.MeshBasicMaterial({ color: o.color || Constants.ao.defaultColor });

    const light = new THREE.PointLight(o.color, o.radius.value, 10000000);
    light.castShadow = true;
    light.power = Constants.sun.lightPower;
    group.add(light);

    const sun = new THREE.Mesh(geo, mat);
    sun.layers.enable(Constants.layers.bloom);
    group.add(sun);

    return group;
  }

  private buildPlanet(o: IAO, center?: THREE.Vector3) {
    return this.buildDefault(o, center);
  }

  private buildMoon(o: IAO, center?: THREE.Vector3) {
    return this.buildDefault(o, center);
  }

  private buildDefault(o: IAO, center?: THREE.Vector3) {
    return this.getDefaultObject(o, center);
  }

  private getDefaultObject(o: IAO, center?: THREE.Vector3) {
    const group = new THREE.Group();
    const geo = new THREE.SphereGeometry(o.radius.value, 32, 32);
    const mat = new THREE[Constants.mode === 'actual' ? 'MeshStandardMaterial' : 'MeshBasicMaterial']({
      color: o.color || Constants.ao.defaultColor,
    });
    const obj = new THREE.Mesh(geo, mat);
    obj.castShadow = true;
    obj.receiveShadow = true;

    group.add(obj);

    return group;
  }
}
