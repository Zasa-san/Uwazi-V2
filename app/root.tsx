import * as React from 'react';
import { json, LoaderFunction } from '@remix-run/node';
import { Links, Meta, Outlet, Scripts, useLoaderData } from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';
import { useChangeLanguage } from 'remix-i18next';
import { useTranslation } from 'react-i18next';
import tailwindStylesheetUrl from './styles/bundled.module.css';
import { Navigation } from './components/common/Navigation/Navigation';
import { i18n as i18nServer } from './ i18n.server';

const links: LinksFunction = () => [{ rel: 'stylesheet', href: tailwindStylesheetUrl }];

type LoaderData = { locale: string };

export const loader: LoaderFunction = async ({ request }) => {
  const locale = await i18nServer.getLocale(request);
  return json<LoaderData>({ locale });
};

const App = () => {
  // Get the locale from the loader
  const { locale } = useLoaderData<LoaderData>();

  const { i18n } = useTranslation();

  // This hook will change the i18n instance language to the current locale
  // detected by the loader, this way, when we do something to change the
  // language, this locale will change and i18next will load the correct
  // translation files
  useChangeLanguage(locale);
  return (
    <html lang={locale} dir={i18n.dir()}>
      <head>
        <Meta />
        <title>Uwazi UI v2</title>
        <Links />
      </head>
      <body>
        <Navigation />
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
};

export { links };
export default App;
