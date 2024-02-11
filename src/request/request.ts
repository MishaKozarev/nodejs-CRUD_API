import { IncomingMessage, ServerResponse } from 'http';
import { v4 as uuidv4 } from 'uuid';
import { ErrorMessage, User } from '../models/index';
import { sendResponse } from '../utils/sendResponse';
import { validatorUUID } from '../utils/uuidValidation';
import { jsonParse } from '../utils/json-parse';
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
    } else if (method === 'POST' && url === '/api/users') {
      let body = '';

      req.on('data', (chunk) => {
        body += chunk;
      });

      req.on('end', () => {
        try {
          const { username, age, hobbies } =
          jsonParse<Partial<User>>(body) || {};

          if (!username || !age || !hobbies || !Array.isArray(hobbies)) {
            sendResponse(res, 400, {
              message: Message.missingRequiredFields,
            } as ErrorMessage);
          } else {
            const currentUser: User = {
              id: uuidv4(),
              username,
              age,
              hobbies,
            };

            users.push(currentUser);

            sendResponse(res, 201, currentUser);
          }
        } catch (error) {
          console.error(error);
        }
      });
    }
  } catch (error) {
    console.error(error);
  }
}

