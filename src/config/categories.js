import {
  CATEGORY_HOT_WATER_SUPPLY,
  CATEGORY_HOT_WATER_SUPPLY_NAME,
  CATEGORY_HOT_WATER_SUPPLY_IMAGE,
  CATEGORY_HEATING,
  CATEGORY_HEATING_NAME,
  CATEGORY_HEATING_IMAGE,
  CATEGORY_OTHER,
  CATEGORY_OTHER_NAME,
  CATEGORY_OTHER_IMAGE,
  CATEGORY_MANUAL_ESP,
  CATEGORY_LIGHTING,
  CATEGORY_LIGHTING_NAME,
  CATEGORY_LIGHTING_IMAGE,
} from '../secrets';

export const categoriesConfig = (category) => {
  switch (category) {
    case CATEGORY_HOT_WATER_SUPPLY:
      return {
        category: CATEGORY_HOT_WATER_SUPPLY,
        name: CATEGORY_HOT_WATER_SUPPLY_NAME,
        image: CATEGORY_HOT_WATER_SUPPLY_IMAGE,
        gradient: true,
      };
    case CATEGORY_HEATING:
      return {
        category: CATEGORY_HEATING,
        name: CATEGORY_HEATING_NAME,
        image: CATEGORY_HEATING_IMAGE,
        gradient: true,
      };
    case CATEGORY_MANUAL_ESP:
      return {
        category: CATEGORY_OTHER,
        name: CATEGORY_OTHER_NAME,
        image: CATEGORY_OTHER_IMAGE,
        gradient: true,
      };
    case CATEGORY_LIGHTING:
      return {
        category: CATEGORY_LIGHTING,
        name: CATEGORY_LIGHTING_NAME,
        image: CATEGORY_LIGHTING_IMAGE,
        gradient: false,
      };
    default:
      return null;
  }
};
