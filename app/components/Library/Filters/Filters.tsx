import { useFetcher, useLocation } from '@remix-run/react';
import React from 'react';

const Filters = () => {
  const fetcher = useFetcher();
  const { search } = useLocation();

  return (
    <div>
      <h2 className="text-xl font-semibold">Filters</h2>
      <div className="mb-4 text-gray-500">General</div>
      <fetcher.Form className="border-solid border-2" action={search}>
        <label htmlFor="includeUnpublished">Include Unpublished</label>
        <input
          name="includeUnpublished"
          type="checkbox"
          onChange={event => {
            fetcher.submit(event.target.form, { replace: false });
          }}
        />
      </fetcher.Form>
    </div>
  );
};

export { Filters };
