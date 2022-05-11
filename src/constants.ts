import * as THREE from 'three';

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
    },
  },
};

export const Constants = {
  scene: {
    center: new THREE.Vector3(0, 0, 0),
    bg: '/textures/stars.jpg',
  },
  layers: {
    bloom: 1,
  },
  ao: {
    defaultColor: 0x7d827e,
    orbit: {
      color: 0xffffff,
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
