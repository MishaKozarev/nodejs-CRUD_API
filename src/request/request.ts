import { IncomingMessage, ServerResponse } from 'http';
import { ErrorMessage, User } from '../models/index';
import { sendResponse } from '../utils/sendResponse';
import { validatorUUID } from '../utils/uuidValidation';
import { Message, numberId } from '../constants/message.enum';

const users: User[] = [];

export const handleRequest = (req: IncomingMessage, res: ServerResponse) => {
  try {
    const { method, url } = req;

    if (method === 'GET' && url === '/api/users') {
      sendResponse(res, 200, users);
    } else if (url && method === 'GET' && url.startsWith('/api/users/')) {
      const userId = url.split('/')[numberId];
      if (userId && !validatorUUID(userId)) {
        sendResponse(res, 400, { message: Message.invalidUserId } as ErrorMessage);
      }
      const user = users.find((u) => u.id === userId);

      if (!user) {
        sendResponse(res, 404, { message: Message.userNotFound } as ErrorMessage);
      } else {
        sendResponse(res, 200, user);
      }
    }
  } catch (error) {
    console.error(error);
  }
}