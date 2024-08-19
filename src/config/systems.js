import {
  SYSTEM_BOILER,
  SYSTEM_BOILER_NAME,
  CATEGORY_HOT_WATER_SUPPLY,
  CATEGORY_HOT_WATER_SUPPLY_NAME,
  SYSTEM_SOLID_FUEL,
  CATEGORY_HEATING,
  CATEGORY_HEATING_NAME,
  SYSTEM_SOLID_FUEL_NAME,
  SYSTEM_KUPEL,
  SYSTEM_KUPEL_NAME,
  SYSTEM_SMART_CONTROLLER,
  SYSTEM_SMART_CONTROLLER_NAME,
  CATEGORY_OTHER,
  CATEGORY_OTHER_NAME,
} from '../secrets.js';

export const systemsConfig = (system) => {
  switch (system) {
    case SYSTEM_BOILER:
      return {
        system: SYSTEM_BOILER,
        category: CATEGORY_HOT_WATER_SUPPLY,
        category_name: CATEGORY_HOT_WATER_SUPPLY_NAME,
        name: SYSTEM_BOILER_NAME,
      };
    case SYSTEM_SOLID_FUEL:
      return {
        system: SYSTEM_SOLID_FUEL,
        category: CATEGORY_HEATING,
        category_name: CATEGORY_HEATING_NAME,
        name: SYSTEM_SOLID_FUEL_NAME,
      };
    case SYSTEM_KUPEL:
      return {
        system: SYSTEM_KUPEL,
        category: CATEGORY_HEATING,
        category_name: CATEGORY_HEATING_NAME,
        name: SYSTEM_KUPEL_NAME,
      };
    case SYSTEM_SMART_CONTROLLER:
      return {
        system: SYSTEM_SMART_CONTROLLER,
        category: CATEGORY_OTHER,
        category_name: CATEGORY_OTHER_NAME,
        name: SYSTEM_SMART_CONTROLLER_NAME,
      };
    default:
      return null;
  }
};
