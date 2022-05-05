import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { EntryContext } from 'remix';
import { RemixServer } from '@remix-run/react';

import { createInstance } from 'i18next';
import Backend from 'i18next-fs-backend';
import { resolve } from 'node:path';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { initSession } from './file.session.server';
import { i18n } from './ i18n.server';

const handleRequest = async (
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) => {
  // First, we create a new instance of i18next so every request will have a
  // completely unique instance and not share any state
  const instance = createInstance();

  // Then we could detect locale from the request
  const lng = await i18n.getLocale(request);
  // And here we detect what namespaces the routes about to render want to use
  const ns = i18n.getRouteNamespaces(remixContext);

  await instance
    .use(initReactI18next) // Tell our instance to use react-i18next
    .use(Backend) // Setup our backend
    .init({
      // And configure i18next as usual
      supportedLngs: ['es', 'en'],
      defaultNS: 'common',
      fallbackLng: 'en',
      // Disable suspense again here
      react: { useSuspense: false },
      lng, // The locale we detected above
      ns, // The namespaces the routes about to render want to use
      backend: {
        loadPath: resolve('./public/locales/{{lng}}/{{ns}}.json'),
      },
    });

  // Then you can render your app wrapped in the I18nextProvider as in the
  // entry.client file
  const markup = renderToString(
    <I18nextProvider i18n={instance}>
      <RemixServer context={remixContext} url={request.url} />
    </I18nextProvider>
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
