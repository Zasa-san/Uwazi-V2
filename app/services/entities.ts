import { json } from '@remix-run/node';

const getEntities = async (params: string) => {
  console.log(params);
  const res = await fetch('http://localhost:3000/api/search');
  if (res.ok) {
    const result = await res.json();
    return json(result);
  }
  const error = new Error(`Error ${res.status}`);
  return Promise.reject(error);
};

export { getEntities };
