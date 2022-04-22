import invariant from '@remix-run/react/invariant';
import { createFileSessionStorage } from 'remix';
import { useTemplates } from './services/templates';

const path = require('path');

invariant(process.env.SESSION_SECRET, 'SESSION_SECRET must be set');

const fileSessionStorage = createFileSessionStorage({
  // The root directory where you want to store the files.
  // Make sure it's writable!
  dir: path.join(process.cwd(), '.cache', 'sessions'),
  cookie: {
    name: '__fileSession',
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === 'production',
  },
});
const getFromSession = async <T>(request: Request, key: string): Promise<T | null> => {
  const cookie = request.headers.get('Cookie');
  if (!cookie) return Promise.resolve(null);
  const session = await fileSessionStorage.getSession(cookie);
  return session.get(key);
};

const initSession = async (request: Request) => {
  const cookie = request.headers.get('Cookie');
  if (!cookie) return null;
  const session = await fileSessionStorage.getSession(cookie);
  if (!session.has('templates')) {
    const templates = await useTemplates().get();
    session.set('templates', templates);

    return fileSessionStorage.commitSession(session, {
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
  }
  return cookie;
};

export { initSession, getFromSession };
