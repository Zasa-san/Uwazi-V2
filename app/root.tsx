import * as React from 'react';
import { Links, Meta, Outlet, Scripts } from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';
import tailwindStylesheetUrl from './styles/bundled.module.css';
import { Navigation } from './components/common/Navigation/Navigation';

const links: LinksFunction = () => [{ rel: 'stylesheet', href: tailwindStylesheetUrl }];

const App = () => (
  <html lang="es" className="h-full">
    <head>
      <Meta />
      <title>Uwazi UI v2</title>
      <Links />
    </head>
    <body className="h-full">
      <Navigation />
      <Outlet />
      <Scripts />
    </body>
  </html>
);

export { links };
export default App;
