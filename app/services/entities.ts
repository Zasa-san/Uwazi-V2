import base64 from 'base-64';

const getEntities = async (searchTerm: string) => {
  const url = `http://localhost:3000/api/search?${searchTerm}`;
  const res = await fetch(url);
  if (res.ok) {
    return res.json();
  }
  const error = new Error(`Error ${res.status}`);
  return Promise.reject(error);
};

const createEntity = async (formData: any) => {
  const url = 'http://localhost:3000/api/entities';
  const headers = new Headers();

  formData.append('published', 'true');

  headers.append('Authorization', `Basic${base64.encode('admin:admin')}`);
  headers.append('X-Requested-With', 'XMLHttpRequest');
  const res = await fetch(url, {
    body: formData,
    method: 'post',
    headers,
  });
  if (res.ok) {
    return res.json();
  }
  const error = new Error(`Error ${res.status}`);
  return Promise.reject(error);
};
export { getEntities, createEntity };
