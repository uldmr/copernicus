import * as THREE from 'three';

import { Constants } from '../../constants';
import { AOType, IAO } from '../../models';
import { Scene } from '../../scene';
import { Converter } from '../../utils';
import { BaseBuilder } from '../base.builder';
import { LabelBuilder } from '../label.builder';
import { AxesBuilder } from './axes.builder';
import { OrbitBuilder } from './orbit.builder';
import { RingsBuilder } from './rings.builder';

export class AOBuilder extends BaseBuilder<IAO, THREE.Group> {
  private _orbitBuilder: OrbitBuilder;
  private _labelBuilder: LabelBuilder;
  private _axesBuilder: AxesBuilder;
  private _ringsBuilder: RingsBuilder;

  constructor(scene: Scene) {
    super(scene);
    this._orbitBuilder = new OrbitBuilder(scene);
    this._labelBuilder = new LabelBuilder(scene);
    this._axesBuilder = new AxesBuilder(scene);
    this._ringsBuilder = new RingsBuilder(scene);
  }

  public build(o: IAO, center?: THREE.Vector3) {
    const group = new THREE.Group();
    const obj = this.buildAO(o);

    if (o.ringSystem) {
      const rings = this._ringsBuilder.build(o.ringSystem);
      obj.add(rings);
    }

    group.add(obj);

    if (o.satellites) {
      o.satellites.forEach((s) => {
        group.add(this.build(s, obj.position));
      });
    }

    if (o.orbit) {
      const orbit = this._orbitBuilder.build(o.orbit, center);
      const path = this._orbitBuilder.getPath(o.orbit, center);
      const initialPos = Math.random();
      let t0 = initialPos;

      this.scene.onTick(() => {
        t0 = (t0 + Math.abs(o.orbit.speed)) % 1;
        const t = o.orbit.period >= 0 ? 1 - t0 : t0;
        const point = path.getPoint(t);
        if (point) obj.position.set(point.x, 0, point.y);
        group.position.set(center.x, center.y, center.z);
      });

      group.rotation.set(center.x + 0, center.y + o.orbit.ascNodeLong, o.orbit.inclination);
      group.add(orbit);
    }

    this.scene.add(group);
    return group;
  }

  // private methods

  private buildAO(o: IAO) {
    let obj: THREE.Group;
    switch (o.type) {
      case AOType.Sun:
        obj = this.buildSun(o);
        break;
      case AOType.DwarfPlanet:
      case AOType.GasGiant:
      case AOType.IceGiant:
      case AOType.Moon:
      case AOType.Planet:
        obj = this.buildPlanet(o);
        break;
      default:
        obj = this.buildDefault(o);
        break;
    }
    obj.matrixAutoUpdate = true;
    obj.userData = o;

    this.scene.onObjectClick(obj, () => {
      console.log(o.name);
    });

    const axes = this._axesBuilder.build(o);
    obj.add(axes);

    const equatorPlane = this.buildEquatorPlane(o);
    obj.add(equatorPlane);

    obj.rotation.x -= Converter.fromDeg(Constants.ao.orbit.inclination);
    obj.rotation.y += o.axialTilt;

    if (o.rotationPeriod) {
      this.scene.onTick(() => {
        obj.rotation.z += o.speed;
      });
    }

    return obj;
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

  private buildPlanet(o: IAO) {
    return this.buildDefault(o);
  }

  private buildDefault(o: IAO) {
    return this.getDefaultObject(o);
  }

  private buildEquatorPlane(o: IAO) {
    const geo = new THREE.CircleGeometry(o.diameter, 360, 0, 2 * Math.PI);
    const mat = new THREE.MeshBasicMaterial({ color: 0x2d8fd6, side: THREE.DoubleSide, opacity: 0.5, transparent: true });
    const obj = new THREE.Mesh(geo, mat);
    obj.rotation.set(0, 0, 0);
    return obj;
  }

  private getDefaultObject(o: IAO) {
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
