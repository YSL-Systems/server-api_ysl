import mqtt from 'mqtt';

import { ErrorCode, ErrorMessage, ErrorMessageController } from '../exceptions/root.js';
import { UnvalidException } from '../exceptions/unvalid.js';
import { InternalException } from '../exceptions/internal-exception.js';

import { BROKER_PASSWORD, BROKER_URL, BROKER_USERNAME } from '../secrets.js';

const controllerMiddlewares = async (req, res, next) => {
  const user = req.user;

  const { dataBroker, dataController } = req.body;

  console.log('dataBroker.send_controller', dataBroker.send_controller);

  if (dataBroker.send_controller) {
    const mqttClient = mqtt.connect(BROKER_URL, {
      clientId: `mqtt_${Math.random().toString(16).slice(3)}`,
      username: BROKER_USERNAME,
      password: BROKER_PASSWORD,
    });

    mqttClient.on('connect', () => {
      console.log(`mqttClient Start on Broker ${BROKER_URL}`);

      mqttClient.subscribe(`ysl/${user.topic}/${dataBroker.category}/${dataBroker.system}/#`, (err) => {
        if (err) {
          console.error('Subscription error:', err);

          mqttClient.end();
          return next(new InternalException(ErrorMessage.SERVER_EXCEPTION, ErrorCode.SERVER_EXCEPTION));
        }
      });

      mqttClient.publish(
        `ysl/${user.topic}/${dataBroker.category}/${dataBroker.system}/in`,
        JSON.stringify(dataController),
        (err) => {
          if (err) {
            console.error('Publish error:', err);

            mqttClient.end();
            return next(new InternalException(ErrorMessage.SERVER_EXCEPTION, ErrorCode.SERVER_EXCEPTION));
          }
        }
      );

      mqttClient.handleMessage = async (packet, callback) => {
        await somePromiseReturningFn(packet)
          .then(() => callback())
          .catch(() => callback());
      };

      const somePromiseReturningFn = async (packet) => {
        try {
          const system = packet.topic.split('/')[3];
          const type = packet.topic.split('/')[4];

          const payload = JSON.parse(packet.payload.toString());

          if (type === 'out') {
            console.log('TYPE_OUT', JSON.parse(packet.payload.toString()));

            if (system === dataBroker.system) {
              if (payload.command === dataController.command) {
                if (JSON.parse(payload.success)) {
                  mqttClient.end();

                  if (payload.command === 5 && payload?.sensor) {
                    req.controller_id = payload.sensor.id;
                  }

                  next();
                } else {
                  mqttClient.end();

                  if (user.role === 'ADMIN') {
                    next(
                      new UnvalidException(
                        ErrorMessageController[payload?.error].message,
                        ErrorMessageController[payload?.error].code
                      )
                    );
                  } else {
                    next(new UnvalidException(ErrorMessage.SERVER_EXCEPTION, ErrorCode.SERVER_EXCEPTION));
                  }
                }
              }
            }
          }
        } catch (error) {
          console.error('Message error:', error);

          mqttClient.end();
          return next(new InternalException(ErrorMessage.SERVER_EXCEPTION, ErrorCode.SERVER_EXCEPTION));
        }
      };

      setTimeout(() => {
        console.error('Timeout Message');

        mqttClient.end();
        return next(new InternalException(ErrorMessage.CONTROLLER_EXCEPTION, ErrorCode.CONTROLLER_EXCEPTION));
      }, 4000);
    });

    mqttClient.on('error', (err) => {
      console.error('MQTT Client Error:', err);

      mqttClient.end();
      return next(new InternalException(ErrorMessage.SERVER_EXCEPTION, ErrorCode.SERVER_EXCEPTION));
    });
  } else {
    next();
  }
};

export default controllerMiddlewares;
