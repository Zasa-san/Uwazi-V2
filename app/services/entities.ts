const getEntities = async (searchTerm: string) => {
  const url = `http://localhost:3000/api/search?${searchTerm}`;
  const res = await fetch(url);
  if (res.ok) {
    return res.json();
  }
  const error = new Error(`Error ${res.status}`);
  return Promise.reject(error);
};

export { getEntities };
