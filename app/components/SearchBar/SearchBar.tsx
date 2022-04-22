import * as React from 'react';
import { Form } from '@remix-run/react';
import { useQueryParameters } from '../common/Hooks/useQueryParameters';

const SearchBar = () => {
  const { search, meta } = useQueryParameters(['searchTerm']);

  return (
    <Form className="border-2 border-solid" action={search}>
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
