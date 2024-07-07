import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export const PORT = process.env.PORT;
export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
export const JWT_REFRECH_SECRET = process.env.JWT_REFRECH_SECRET;
export const BOT_TOKEN = process.env.BOT_TOKEN;
export const CHAT_ID = process.env.CHAT_ID;
export const BROKER_URL = process.env.BROKER_URL;
export const BROKER_USERNAME = process.env.BROKER_USERNAME;
export const BROKER_PASSWORD = process.env.BROKER_PASSWORD;

// CATEGORIES
export const CATEGORY_HOT_WATER_SUPPLY = process.env.CATEGORY_HOT_WATER_SUPPLY;
export const CATEGORY_HOT_WATER_SUPPLY_NAME = process.env.CATEGORY_HOT_WATER_SUPPLY_NAME;
export const CATEGORY_HOT_WATER_SUPPLY_IMAGE = process.env.CATEGORY_HOT_WATER_SUPPLY_IMAGE;

export const CATEGORY_HEATING = process.env.CATEGORY_HEATING;
export const CATEGORY_HEATING_NAME = process.env.CATEGORY_HEATING_NAME;
export const CATEGORY_HEATING_IMAGE = process.env.CATEGORY_HEATING_IMAGE;

export const CATEGORY_OTHER = process.env.CATEGORY_HEATING;
export const CATEGORY_OTHER_NAME = process.env.CATEGORY_OTHER_NAME;
export const CATEGORY_OTHER_IMAGE = process.env.CATEGORY_OTHER_IMAGE;

export const CATEGORY_LIGHTING = process.env.CATEGORY_LIGHTING;
export const CATEGORY_LIGHTING_NAME = process.env.CATEGORY_LIGHTING_NAME;
export const CATEGORY_LIGHTING_IMAGE = process.env.CATEGORY_LIGHTING_IMAGE;

export const CATEGORY_MANUAL_ESP = process.env.CATEGORY_MANUAL_ESP;

// SYSTEMS
export const SYSTEM_BOILER = process.env.SYSTEM_BOILER;
export const SYSTEM_BOILER_NAME = process.env.SYSTEM_BOILER_NAME;

export const SYSTEM_SOLID_FUEL = process.env.SYSTEM_SOLID_FUEL;
export const SYSTEM_SOLID_FUEL_NAME = process.env.SYSTEM_SOLID_FUEL_NAME;

export const SYSTEM_KUPEL = process.env.SYSTEM_KUPEL;
export const SYSTEM_KUPEL_NAME = process.env.SYSTEM_KUPEL_NAME;

export const SYSTEM_SMART_CONTROLLER = process.env.SYSTEM_SMART_CONTROLLER;
export const SYSTEM_SMART_CONTROLLER_NAME = process.env.SYSTEM_SMART_CONTROLLER_NAME;
