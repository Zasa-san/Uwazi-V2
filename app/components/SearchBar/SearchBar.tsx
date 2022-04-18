import * as React from 'react';
import { Form, useSubmit } from '@remix-run/react';

const SearchBar = () => {
  const submit = useSubmit();

  function handleChange(event) {
    console.log(event.currentTarget);
    submit(event.currentTarget, { replace: true });
  }

  return (
    <Form className="border-solid border-2" onSubmit={handleChange}>
      <label htmlFor="queryString" className="hidden">
        Search in Library
      </label>
      <input type="text" id="queryString" placeholder="search" />
    </Form>
  );
};

export { SearchBar };
