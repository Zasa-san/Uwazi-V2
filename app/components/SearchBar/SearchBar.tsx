import * as React from 'react';
import { Form, useLoaderData } from '@remix-run/react';

const SearchBar = () => {
  const { meta } = useLoaderData();
  return (
    <Form className="border-solid border-2">
      <label htmlFor="searchTerm" className="hidden">
        Search in Library
      </label>
      <input
        name="searchTerm"
        type="text"
        placeholder="Search"
        defaultValue={meta.filters.searchTerm}
      />
    </Form>
  );
};

export { SearchBar };
