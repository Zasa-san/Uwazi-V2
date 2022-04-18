import { Form, useFetcher } from '@remix-run/react';
import React from 'react';

const Filters = () => {
  const fetcher = useFetcher();
  return (
    <aside className="h-screen sticky top-0" aria-label="Sidebar">
      <div className="overflow-y-auto py-4 px-3">
        <h2 className="text-2xl font-bold mb-4">Filters</h2>
        <div className="mb-4">General</div>
        <Form className="border-solid border-2">
          <label htmlFor="includeUnpublished">Include Unpublished</label>
          <input
            name="includeUnpublished"
            type="checkbox"
            onChange={event => {
              fetcher.submit(event.target.form);
            }}
          />
          <button
            type="submit"
            className="w-full rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
          >
            Search
          </button>
        </Form>
      </div>
    </aside>
  );
};

export { Filters };
