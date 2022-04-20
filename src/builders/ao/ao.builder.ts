import * as THREE from 'three';
import { Constants } from '../../constants';

import { AOType, IAO } from '../../models';
import { Scene } from '../../scene';
import { BaseBuilder } from '../base.builder';
import { OrbitBuilder } from './orbit.builder';

export class AOBuilder extends BaseBuilder<IAO, THREE.Object3D> {
  private _orbitBuilder: OrbitBuilder;

  constructor(scene: Scene) {
    super(scene);
    this._orbitBuilder = new OrbitBuilder(scene);
  }

  public build(o: IAO) {
    const obj = this.buiildAO(o);
    this.buildSatellites(o);
    this.buildOrbit(o);
    return obj;
  }

  // private methods

  private buiildAO(o: IAO) {
    switch (o.type) {
      case AOType.Sun:
        return this.buildSun(o);
      case AOType.DwarfPlanet:
      case AOType.GasGiant:
      case AOType.IceGiant:
      case AOType.Moon:
      case AOType.Planet:
        return this.buildPlanet(o);
      default:
        return this.buildDefault(o);
    }
  }

  private buildSatellites(o: IAO) {
    if (o.satellites) {
      o.satellites.forEach((s) => {
        this.build(s);
      });
    }
  }

  private buildOrbit(o: IAO) {
    if (o.orbit) {
      this._orbitBuilder.build(o.orbit, o.radius);
    }
  }

  private buildSun(o: IAO) {
    const geo = new THREE.IcosahedronGeometry(o.radius, 32);
    const mat = new THREE.MeshBasicMaterial({ color: o.color || Constants.ao.defaultColor });
    const sun = new THREE.PointLight(o.color, o.radius, 1000);
    sun.castShadow = true;
    sun.power = Constants.sun.lightPower;
    const obj = new THREE.Mesh(geo, mat);
    obj.layers.enable(Constants.layers.bloom);
    sun.add(obj);
    this.scene.add(sun);
    return sun;
  }

  private buildPlanet(o: IAO) {
    return this.buildDefault(o);
  }

  private buildDefault(o: IAO) {
    const obj = this.getDefaultObject(o);
    this.scene.add(obj);
    return obj;
  }

  private getDefaultObject(o: IAO) {
    const geo = new THREE.SphereGeometry(o.radius, 32, 32);
    const mat = new THREE.MeshStandardMaterial({ color: o.color || Constants.ao.defaultColor });
    const obj = new THREE.Mesh(geo, mat);
    obj.castShadow = true;
    obj.receiveShadow = true;
    if (o.orbit) {
      this.scene.onTick((elapsed) => {
        obj.position.set(Math.sin(elapsed) * o.orbit.aphelion, 0, Math.cos(elapsed) * o.orbit.aphelion);
      });
    }
    return obj;
  }
}
