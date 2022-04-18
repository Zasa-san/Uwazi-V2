import { json } from '@remix-run/node';

const getEntities = async (searchTerm: string) => {
  const res = await fetch(`http://localhost:3000/api/search?${searchTerm}`);
  if (res.ok) {
    const result = await res.json();
    return json(result);
  }
  const error = new Error(`Error ${res.status}`);
  return Promise.reject(error);
};

export { getEntities };
