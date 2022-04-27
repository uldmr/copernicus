import * as THREE from 'three';
import { Constants } from '../../constants';

import { AOType, IAO } from '../../models';
import { Scene } from '../../scene';
import { BaseBuilder } from '../base.builder';
import { LabelBuilder } from '../label.builder';
import { OrbitBuilder } from './orbit.builder';

export class AOBuilder extends BaseBuilder<IAO, THREE.Object3D> {
  private _orbitBuilder: OrbitBuilder;
  private _labelBuilder: LabelBuilder;
  private _scaleVector = new THREE.Vector3();

  constructor(scene: Scene) {
    super(scene);
    this._orbitBuilder = new OrbitBuilder(scene);
    this._labelBuilder = new LabelBuilder(scene);
  }

  public build(o: IAO) {
    this.buildOrbit(o);
    const obj = this.buiildAO(o);
    this.buildSatellites(o);

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
      return this._orbitBuilder.build(o.orbit);
    }
  }

  private buildSun(o: IAO) {
    const geo = new THREE.IcosahedronGeometry(o.radius.value, 32);
    const mat = new THREE.MeshBasicMaterial({ color: o.color || Constants.ao.defaultColor });
    let sun = new THREE.PointLight(o.color, o.radius.value, 10000000);
    sun.castShadow = true;
    sun.power = Constants.sun.lightPower;
    const obj = new THREE.Mesh(geo, mat);
    obj.layers.enable(Constants.layers.bloom);
    const label = this._labelBuilder.build(o.name);
    label.position.set(0, o.radius.value * 1.2, 0);
    obj.add(label);
    sun.add(obj);
    this.scene.add(sun);

    this.scene.onTick(() => {
      this.scaleLabel(obj);
    });

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
    const geo = new THREE.SphereGeometry(o.radius.value, 32, 32);
    const mat = new THREE[Constants.mode === 'actual' ? 'MeshStandardMaterial' : 'MeshBasicMaterial']({
      color: o.color || Constants.ao.defaultColor,
    });
    const obj = new THREE.Mesh(geo, mat);
    const label = this._labelBuilder.build(o.name);
    label.position.set(0, o.radius.value * 1.2, 0);
    obj.add(label);
    obj.castShadow = true;
    obj.receiveShadow = true;

    if (o.orbit) {
      const path = this._orbitBuilder.getPath(o.orbit);
      const initialPos = Math.random();
      this.scene.onTick((elapsed) => {
        const point = path.getPoint(1 - ((elapsed / o.orbit.period + initialPos) % 1));
        obj.position.set(point.x, 0, point.y);
        this.scaleLabel(obj);
      });
    }
    return obj;
  }

  private scaleLabel(obj: THREE.Mesh) {
    const sprite = obj.children[0];
    const scale = this._scaleVector.subVectors(obj.position, this.scene.camera.position).length() / Constants.scaleFactor;
    sprite.scale.set(scale, scale, 1);
  }
}
