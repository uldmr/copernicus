import * as THREE from 'three';
import { Scene } from '../scene';

import { AOOrbit } from './AstronomicalObjectOrbit';

/** Astronomical Object */
export class AO {
  /** The common name of the object  */
  public name: string;

  /** Mark object as star */
  public isStar?: boolean;

  /** Mean radius of the object (Earths) */
  public radius: number;

  /** Sidereal rotation period (days) */
  public rotationPeriod: number;

  /** Orbit of the object */
  public orbit?: AOOrbit;

  /** Object satellites */
  public satellites?: AO[];

  constructor() {}

  public build(scene: Scene) {
    this.isStar ? this.buildStarObject(scene) : this.buildObject(scene);
    this.buildOrbit(scene);

    this.satellites?.forEach((satellite) => satellite.build(scene));
  }

  private buildStarObject(scene: Scene) {
    const geometry = this.getGeometry();
    const light = new THREE.PointLight(0xffffff, 2, 300);
    light.castShadow = true;
    light.power = 500;
    const hemiLght = new THREE.HemisphereLight(0xddeeff, 0x0f0e0d0, 0.1);
    const material = this.getStarMaterial(light.intensity);
    light.add(new THREE.Mesh(geometry, material));
    scene.add(light, hemiLght);
  }

  private buildObject(scene: Scene) {
    const geometry = this.getGeometry();
    const material = this.getMaterial();
    const obj = new THREE.Mesh(geometry, material);
    obj.receiveShadow = true;
    obj.castShadow = true;
    scene.onTick((elapsed) => {
      obj.position.set(Math.sin(elapsed) * 10, 0, Math.cos(elapsed) * 10);
    });
    scene.add(obj);
  }

  private getGeometry() {
    return new THREE.SphereGeometry(this.radius, 32, 32);
  }

  private getMaterial() {
    return new THREE.MeshStandardMaterial({
      color: 0x000000, // TODO replace with the actual color
      // specular: 0x333333,
      // shininess: 5,
      // map: textureLoader.load('/textures/planets/earth_atmos_2048.jpg'),
      // specularMap: textureLoader.load('/textures/planets/earth_specular_2048.jpg'),
      // normalMap: textureLoader.load('/textures/planets/earth_normal_2048.jpg'),
      // normalScale: new THREE.Vector2(0.85, 0.85),
    });
  }

  private getStarMaterial(lightIntensity: number) {
    return new THREE.MeshStandardMaterial({
      emissive: 0xd14000,
      envMapIntensity: 1,
      emissiveIntensity: lightIntensity / Math.pow(0.02, 2),
    });
  }

  private buildOrbit(scene: Scene) {
    const geometry = new THREE.TorusGeometry(10, 0.01, 5, 360);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const orbit = new THREE.Mesh(geometry, material);
    orbit.rotation.set(THREE.MathUtils.degToRad(90), 0, 0);
    scene.add(orbit);
  }
}
