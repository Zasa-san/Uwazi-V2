import { post } from './apiClient';

const getEntities = async (searchTerm: string) => {
  const url = `http://localhost:3000/api/search?${searchTerm}`;
  const res = await fetch(url);
  if (res.ok) {
    return res.json();
  }
  const error = new Error(`Error ${res.status}`);
  return Promise.reject(error);
};

const createEntity = async (formData: any, request: any) => {
  const data = { title: formData.get('title'), published: true };
  const res = await post('entities', data, request);
  if (res.ok) {
    return res.json();
  }
  const error = new Error(`Error ${res.status}`);
  return Promise.reject(error);
};

export { getEntities, createEntity };
