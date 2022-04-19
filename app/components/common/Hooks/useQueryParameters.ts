import { useLoaderData, useLocation } from '@remix-run/react';

export const useQueryParameters = (fields: string[]) => {
  const { search } = useLocation();
  const { meta } = useLoaderData();
  const composedSearch = new URLSearchParams(search);
  composedSearch.delete(fields[0]);
  return { search: `?${composedSearch.toString()}`, meta };
};
