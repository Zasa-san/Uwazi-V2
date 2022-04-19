import { useTemplates } from './templates';

const getEntities = async (searchTerm: string) => {
  const url = `http://localhost:3000/api/search?${searchTerm}`;
  const res = await fetch(url);
  const { get: getTemplates } = useTemplates();
  if (res.ok) {
    const result = await res.json();
    const templates = await getTemplates();
    const rows = result.rows.map((row: any) => {
      const template = templates.find((t: any) => t._id === row.template).name;
      return { ...row, template };
    });

    return { ...result, rows };
  }
  const error = new Error(`Error ${res.status}`);
  return Promise.reject(error);
};

export { getEntities };
