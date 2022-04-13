import * as React from 'react';

import { useLoaderData } from '@remix-run/react';
import { Cards } from '../../components/Cards/Cards';
import { getEntities } from '../../services/entities';
import { ErrorBoundary } from '../../components/common/error.boundary';

const loader = async () => getEntities();
const meta = () => ({ title: 'Library Cards Uwazi' });
const Library = () => {
  const { rows: entities, totalRows } = useLoaderData();
  return (
    <main>
      <div className="mx-auto mt-16 max-w-7xl text-center">Library home {totalRows}</div>
      <Cards entities={entities} />
    </main>
  );
};

export { meta, loader, ErrorBoundary };
export default Library;
