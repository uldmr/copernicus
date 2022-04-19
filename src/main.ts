import { SolarSystem } from './data/solarSystem';
import { Scene } from './scene';

const scene = new Scene();
SolarSystem.build(scene);
scene.run();
