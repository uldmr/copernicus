import data from './data/solarSystem.json';
import { SolarSystem } from './models';
import { Scene } from './scene';
import { SolarSystemBuilder } from './builders';
import { initControls } from './controls';

const scene = new Scene();
const solarSystem = new SolarSystem(data);
const builder = new SolarSystemBuilder(scene);
builder.build(solarSystem);
scene.run();

initControls(scene);