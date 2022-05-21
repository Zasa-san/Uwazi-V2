import { json, LoaderFunction } from '@remix-run/node';
import React from 'react';
import { get } from '../../services/apiClient';
import { createUserSession } from '../../session.server';

const loader: LoaderFunction = async ({ request, params }) => {
  const res = await get('user', request);
  if (res.ok) {
    const user = await res.json();
    return createUserSession({
      request,
      user,
      remember: true,
      redirectTo: params.redirectTo || '/library',
    });
  }
  return json({});
};

const Session = () => {
  return <div></div>;
};
export { loader };
export default Session;
