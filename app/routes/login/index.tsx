import * as React from 'react';
import type { ActionFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';

import { Form, Link, useActionData, useSearchParams } from '@remix-run/react';
import { getUserId } from '../../session.server';
import { post } from '../../services/apiClient';

const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (userId) return redirect('/');
  return json({});
};

interface ActionData {
  errors?: {
    userName?: string;
    password?: string;
  };
}

const validateFields = (userName?: string, password?: string) => {
  const errors: { [key: string]: string } = {};
  if (typeof userName !== 'string') {
    errors.userName = 'User name is required';
  }
  if (typeof password !== 'string') {
    errors.password = 'Password is required';
  }
  return errors;
};

const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const userName = formData.get('userName');
  const password = formData.get('password');

  const errors = validateFields(userName, password);
  if (Object.keys(errors).length > 0) return json<ActionData>({ errors }, { status: 400 });

  const res = await post('login', { username: userName, password });

  if (res.ok) {
    request.headers.append('set-cookie', res.headers.get('set-cookie')!);
    return redirect(`/login/session?redirectTo=${formData.get('redirectTo')}`, {
      headers: {
        'Set-Cookie': request.headers.get('set-cookie')!,
      },
    });
  }
  return json<ActionData>(
    { errors: { userName: 'Invalid user name or password' } },
    { status: 400 }
  );
};

const meta: MetaFunction = () => ({
  title: 'Index',
});

const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/library';
  const actionData = useActionData() as ActionData;
  const userNameRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (actionData?.errors?.userName) {
      userNameRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <div className="flex flex-col justify-center min-h-full">
      <div className="w-full max-w-md px-8 mx-auto">
        <Form method="post" className="space-y-6">
          <div>
            <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
              User Name
            </label>
            <div className="mt-1">
              <input
                ref={userNameRef}
                id="userName"
                required
                name="userName"
                type="userName"
                autoComplete="userName"
                aria-invalid={actionData?.errors?.userName ? true : undefined}
                aria-describedby="username-error"
                className="w-full px-2 py-1 text-lg border border-gray-500 rounded"
              />
              {actionData?.errors?.userName && (
                <div className="pt-1 text-red-700" id="email-error">
                  {actionData.errors.userName}
                </div>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                ref={passwordRef}
                name="password"
                type="password"
                autoComplete="current-password"
                aria-invalid={actionData?.errors?.password ? true : undefined}
                aria-describedby="password-error"
                className="w-full px-2 py-1 text-lg border border-gray-500 rounded"
              />
              {actionData?.errors?.password && (
                <div className="pt-1 text-red-700" id="password-error">
                  {actionData.errors.password}
                </div>
              )}
            </div>
          </div>

          <input type="hidden" name="redirectTo" value={redirectTo} />
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:bg-blue-400"
          >
            Log in
          </button>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="remember" className="block ml-2 text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <div className="text-sm text-center text-gray-500">
              Don´&apos;t have an account?{' '}
              <Link
                className="text-blue-500 underline"
                to={{
                  pathname: '/join',
                  search: searchParams.toString(),
                }}
              >
                Sign up
              </Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export { loader, action, meta };
export default LoginPage;
