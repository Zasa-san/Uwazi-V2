import { createCookieSessionStorage, redirect } from '@remix-run/node';

import invariant from '@remix-run/react/invariant';

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

const USER_SESSION_KEY = 'userId';

const getSession = async (request: Request) => {
  const cookie = request.headers.get('Cookie');
  return sessionStorage.getSession(cookie);
};

const logout = async (request: Request) => {
  const session = await getSession(request);
  return redirect('/', {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session),
    },
  });
};

const getUserId = async (request: Request): Promise<string | undefined> => {
  const session = await getSession(request);
  const userId = session.get(USER_SESSION_KEY);
  return userId;
};

const requireUserId = async (
  request: Request,
  redirectTo: string = new URL(request.url).pathname
): Promise<string> => {
  const userId = await getUserId(request);
  if (!userId) {
    const searchParams = new URLSearchParams([['redirectTo', redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return userId;
};

async function createUserSession({
  request,
  user,
  remember,
  redirectTo,
}: {
  request: Request;
  user: { _id: string };
  remember: boolean;
  redirectTo: string;
}) {
  const session = await getSession(request);
  session.set(USER_SESSION_KEY, user._id);
  session.set('user', user);
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session, {
        maxAge: remember
          ? 60 * 60 * 24 * 7 // 7 days
          : undefined,
      }),
    },
  });
}

export { createUserSession, getUserId, getSession, logout, requireUserId };
