import * as React from 'react';

import { useLoaderData } from '@remix-run/react';
import { LoaderFunction } from '@remix-run/node';
import { Cards } from '../../components/Cards/Cards';
import { getEntities } from '../../services/entities';
import { ErrorBoundary } from '../../components/common/ErrorHandling/error.boundary';
import { requireUserId } from '../../session.server';
import { Toolbar } from '../../components/Toolbar/Toolbar';

const loader: LoaderFunction = async ({ request }) => {
  console.log(request);
  const userId = await requireUserId(request);
  return getEntities();
};

const meta = () => ({ title: 'Library Cards Uwazi' });
const Library = () => {
  const { rows: entities } = useLoaderData();
  return (
    <main>
      <Toolbar />
      <Cards entities={entities} />
    </main>
  );
};

export { meta, loader, ErrorBoundary };
export default Library;
