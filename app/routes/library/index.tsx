import * as React from 'react';

import { useLoaderData } from '@remix-run/react';
import { LoaderFunction } from '@remix-run/node';
import { useLocation } from 'react-router-dom';
import { Cards } from '../../components/Cards/Cards';
import { getEntities } from '../../services/entities';
import { ErrorBoundary } from '../../components/common/ErrorHandling/error.boundary';
import { requireUserId } from '../../session.server';
import { Toolbar } from '../../components/Toolbar/Toolbar';
import { Filters } from '../../components/Library/Filters/Filters';

const loader: LoaderFunction = async ({ request }) => {
  console.log(request);
  const userId = await requireUserId(request);
  const url = new URL(request.url);
  const searchTerm = url.searchParams.toString().replace('=on', '=false');
  return getEntities(searchTerm);
};

const meta = () => ({ title: 'Library Cards Uwazi' });

const Library = () => {
  const { rows: entities } = useLoaderData();
  return (
    <div className="relative">
      <aside className="h-screen sticky absolute">
        <Filters />
      </aside>
      <main>
        <div className="flex">
          <Toolbar />
          <Cards entities={entities} />
        </div>
      </main>
    </div>
  );
};

export { meta, loader, ErrorBoundary };
export default Library;
