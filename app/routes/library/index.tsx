import * as React from 'react';

import { useLoaderData } from '@remix-run/react';
import { json, LoaderFunction } from '@remix-run/node';
import { Cards } from '../../components/Cards/Cards';
import { getEntities } from '../../services/entities';
import { ErrorBoundary } from '../../components/common/ErrorHandling/error.boundary';
import { requireUserId } from '../../session.server';
import { Toolbar } from '../../components/Toolbar/Toolbar';
import { Filters } from '../../components/Library/Filters/Filters';
import { EntityResponseType } from '../../domain/entity.type';
import { getFromSession } from '../../file.session.server';
import { TemplateType } from '../../domain/template.type';

const loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request);
  const url = new URL(request.url);
  const searchTerm = url.searchParams.toString().replace('=on', '=false');
  const filtersEntries = Array.from(url.searchParams.entries());
  const filters = filtersEntries.reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

  const templates = (await getFromSession<TemplateType[]>(request, 'templates')) || [];
  const { rows: rawEntities } = await getEntities(searchTerm);
  const entities = rawEntities.map((entity: EntityResponseType) => ({
    ...entity,
    template: templates.find((template: TemplateType) => template._id === entity.template),
  }));

  return json({
    entities,
    meta: { filters },
  });
};

const meta = () => ({ title: 'Library Cards Uwazi' });

const Library = () => {
  const { entities } = useLoaderData();
  return (
    <div className="flex w-full ">
      <div className="flex-col w-1/5 h-screen px-4 py-8 overflow-y-auto border-r">
        <aside className="absolute h-screen">
          <Filters />
        </aside>
      </div>
      <main>
        <div className="w-4/5 h-full p-4 m-8 overflow-y-auto">
          <Toolbar />
          <Cards entities={entities} />
        </div>
      </main>
    </div>
  );
};

export { meta, loader, ErrorBoundary };
export default Library;
