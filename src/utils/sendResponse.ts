import { ServerResponse } from 'http';

export function sendResponse<T>(
  response: ServerResponse,
  statusCode: number,
  data?: T,
): void {
  if (!response.headersSent) {
    response.statusCode = statusCode;
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(data));
  }
}
