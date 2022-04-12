import * as React from 'react';
import { Links, Meta, Scripts } from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';
import tailwindStylesheetUrl from './styles/bundled.css';

const links: LinksFunction = () => [{ rel: 'stylesheet', href: tailwindStylesheetUrl }];

function App() {
  return (
    <html lang="es" className="h-full">
      <head>
        <title>Uwazi UI v2</title>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <h1 className="text-3xl font-bold underline">Uwazi UI V2</h1>
        <Scripts />
      </body>
    </html>
  );
}

export { links };
export default App;
