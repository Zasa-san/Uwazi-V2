import * as React from 'react';
import ReactDOMServer from 'react-dom/server';
import { EntryContext } from 'remix';
import { RemixServer } from '@remix-run/react';
import { initSession } from './file.session.server';

const handleRequest = async (
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) => {
  const markup = ReactDOMServer.renderToString(
    <RemixServer context={remixContext} url={request.url} />
  );

  const cookie = await initSession(request);
  if (cookie) {
    responseHeaders.set('Set-Cookie', cookie);
  }
  return new Response(`<!DOCTYPE html>${markup}`, {
    status: responseStatusCode,
    headers: {
      ...Object.fromEntries(responseHeaders),
      'Content-Type': 'text/html',
    },
  });
};

export default handleRequest;
