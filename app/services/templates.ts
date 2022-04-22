const useTemplates = () => {
  const get = async () => {
    console.log('FETCHING TEMPLATES');
    const response = await fetch('http://localhost:3000/api/templates');
    return (await response.json()).rows;
  };
  const post = () => {};
  const put = () => {};
  const del = () => {};

  return { get, post, put, del };
};

export { useTemplates };
