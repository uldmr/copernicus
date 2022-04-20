import data from './data/solarSystem.json';
import { SolarSystem } from './models';
import { Scene } from './scene';
import { SolarSystemBuilder } from './builders';

const scene = new Scene();
const solarSystem = new SolarSystem(data);
const builder = new SolarSystemBuilder(scene);
builder.build(solarSystem);
scene.run();
