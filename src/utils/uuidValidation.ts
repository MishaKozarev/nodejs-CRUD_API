import { parse as parseUUID } from 'uuid';

export const validatorUUID = (uuid: string): boolean => {
  try {
    parseUUID(uuid);
    return true;
  } catch (error) {
    return false;
  }
};
