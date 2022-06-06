import * as THREE from 'three';

import { ILayer } from './models';

export enum LayerChannel {
  Bloom = 0,
  Orbits = 1,
  Axes = 2,
  Planes = 3,
}

const Modes = {
  actual: {
    mode: 'actual',
    camera: {
      defaultPos: {
        x: 1000,
        y: 1000,
        z: 1,
      },
      fov: 60,
      near: 0.1,
      far: 10000000,
    },
    zoom: {
      min: 0.1,
    },
    units: {
      /** One distance unit presented in Megameters (Mm) */
      distance: 6.378,
      /** One period unit presented in Earth Days */
      rotationPeriod: 24 * 60 * 60 * 1000,
    },
  },
  simple: {
    mode: 'simple',
    camera: {
      defaultPos: {
        x: 1,
        y: 400,
        z: 1,
      },
      fov: 60,
      near: 0.1,
      far: 10000000,
    },
    zoom: {
      min: 0.1,
    },
    units: {
      /** One distance unit presented in Megameters (Mm) */
      distance: 6.378,
      /** One period unit presented in Earth Days */
      rotationPeriod: 24 * 60,
    },
  },
};

export const Layers: ILayer[] = [
  { channel: LayerChannel.Orbits, title: 'Orbits', enabled: true },
  { channel: LayerChannel.Axes, title: 'Axes' },
  { channel: LayerChannel.Planes, title: 'Planes' },
];

export const Constants = {
  scene: {
    center: new THREE.Vector3(0, 0, 0),
    bg: '/textures/stars.jpg',
  },
  ao: {
    defaultColor: 0x7d827e,
    orbit: {
      color: 0xa7dce9,
      /** Orbital inclination (deg) */
      inclination: 90,
    },
    atmosphere: {
      color: 0xffffff,
    },
    axes: {
      widthFactor: 2.5,
      x: {
        color: 0xd6462d,
      },
      y: {
        color: 0x51d62d,
      },
      z: {
        color: 0x2d6dd6,
      },
    },
  },
  sun: {
    lightPower: 100000000,
  },
  scaleFactor: 8,
  ...Modes.simple,
};
