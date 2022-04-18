import * as React from 'react';
import { Form } from '@remix-run/react';

const SearchBar = () => (
  <Form className="border-solid border-2">
    <label htmlFor="searchTerm" className="hidden">
      Search in Library
    </label>
    <input name="searchTerm" type="text" placeholder="Search" />
  </Form>
);

export { SearchBar };
