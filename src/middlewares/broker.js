import { prismaClient } from '../index.js';
import { mqttClient } from '../services/broker.js';
import { categoriesConfig } from '../config/categories.js';
import { systemsConfig } from '../config/systems.js';

const brokerMiddlewares = async (req, res, next) => {
  const id = req.user.id;
  const topic = req.user.topic;

  mqttClient.subscribe(`ysl/${topic}/#`);

  mqttClient.handleMessage = async (packet, callback) => {
    await somePromiseReturningFn(packet)
      .then(() => callback())
      .catch(() => callback());
  };

  const somePromiseReturningFn = async (packet) => {
    const category = packet.topic.split('/')[2];
    const system = packet.topic.split('/')[3];

    if (await checkUserCategory(id, category)) {
      if (await checkUserSystem(id, system)) {
        return true;
      } else {
        await createUserSystem(id, systemsConfig(system));
      }
    } else {
      await createUserCategory(id, categoriesConfig(category));
      await createUserSystem(id, systemsConfig(system));
    }
  };

  const checkUserCategory = async (user_id, category) => {
    try {
      const category_user = await prismaClient.category.findFirst({
        where: { user_id, category },
      });

      return category_user;
    } catch (error) {
      console.log('error checkUserCategory', error);
      return null;
    }
  };
  const checkUserSystem = async (user_id, system) => {
    try {
      const system_user = await prismaClient.system.findFirst({
        where: { user_id, system },
      });

      return system_user;
    } catch (error) {
      console.log('error checkUserSystem', error);
      return null;
    }
  };
  const createUserCategory = async (user_id, data) => {
    try {
      if (data) {
        await prismaClient.category.create({
          data: {
            user_id,
            ...data,
          },
        });
      }

      return true;
    } catch (error) {
      console.log('error createUserCategory', error);
      return null;
    }
  };
  const createUserSystem = async (user_id, data) => {
    try {
      if (data) {
        await prismaClient.system.create({
          data: {
            user_id,
            ...data,
            favorite: false,
          },
        });
      }

      return true;
    } catch (error) {
      console.log('error createUserSystem', error);
      return null;
    }
  };

  setTimeout(async () => {
    mqttClient.unsubscribe(`ysl/${topic}/#`);

    const user = await prismaClient.user.findUnique({
      where: { id },
    });

    req.user = user;
    next();
  }, 2000);
};

export default brokerMiddlewares;
