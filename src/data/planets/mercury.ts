import { AO, AOOrbit } from '../../models';

const ao = new AO();
ao.name = 'Mercury';
ao.radius = 0.27;
ao.rotationPeriod = 58.646;

const orbit = new AOOrbit();
orbit.e = 0.20563;
orbit.aphelion = 0.466697;
orbit.perihelion = 0.307499;
orbit.period = 87.9691;

ao.orbit = orbit;

export default ao;
