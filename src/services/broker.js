import mqtt from 'mqtt';
import { BROKER_PASSWORD, BROKER_URL, BROKER_USERNAME } from '../secrets.js';

const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

console.log('mqttClient Function');

export const mqttClient = mqtt.connect(BROKER_URL, {
  clientId,
  username: BROKER_USERNAME,
  password: BROKER_PASSWORD,
});
