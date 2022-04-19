import { createCookieSessionStorage } from '@remix-run/node';
import invariant from '@remix-run/react/invariant';

const useTemplates = () => {
  const get = async () => {
    invariant(process.env.SESSION_SECRET, 'SESSION_SECRET must be set');

    const sessionStorage = createCookieSessionStorage({
      cookie: {
        name: '__session',
        httpOnly: true,
        maxAge: 0,
        path: '/',
        sameSite: 'lax',
        secrets: [process.env.SESSION_SECRET],
        secure: process.env.NODE_ENV === 'production',
      },
    });

    const session = await sessionStorage.getSession();
    let templates;
    if (session.has('templates')) {
      templates = session.get('templates');
      console.log('TEMPLATES FROM SESSION');
    } else {
      const response = await fetch('http://localhost:3000/api/templates');
      templates = (await response.json()).rows;

      console.log('TEMPLATES', templates);

      (await sessionStorage.getSession()).set('templates', templates);
    }
    return templates;
  };
  const post = () => {};
  const put = () => {};
  const del = () => {};

  return { get, post, put, del };
};

export { useTemplates };
