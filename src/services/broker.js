import mqtt from 'mqtt';
import { BROKER_PASSWORD, BROKER_URL, BROKER_USERNAME } from '../secrets.js';

const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

export const mqttClient = mqtt.connect(BROKER_URL, {
  clientId,
  username: BROKER_USERNAME,
  password: BROKER_PASSWORD,
});

mqttClient.on('connect', () => {
  console.log(`mqttClient Start on Broker ${BROKER_URL}`);
});

// export const broker = async () => {
//   const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

//   const mqttClient = mqtt.connect(BROKER_URL, {
//     clientId,
//     username: BROKER_USERNAME,
//     password: BROKER_PASSWORD,
//   });

//   mqttClient.on('connect', () => {
//     mqttClient.subscribe('ysl/#');
//   });

//   mqttClient.on('message', async (topic, message) => {
//     console.log('topic', topic);
//     // console.log('message', message.toString());

//     const user_id = topic.split('/')[1];

//     console.log('user_id', user_id);

//     let user = await prismaClient.user.findMany({ where: { topic: user_id } });

//     console.log('user', user);

//     //client.end();
//   });
// };
