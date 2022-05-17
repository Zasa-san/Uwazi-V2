import base64 from 'base-64';

const getUserById = (id: string) => ({ email: 'abc', id });

const verifyLogin = async (email: string, password: string) => {
  const headers = new Headers();

  const data = { username: 'admin', password: 'admin' };
  headers.append('X-Requested-With', 'XMLHttpRequest');
  headers.append('content-type', 'application/json');
  const res = await fetch('http://localhost:3000/api/login', {
    method: 'post',
    body: JSON.stringify(data),
    headers,
    mode: 'cors',
  });

  if (res.ok) {
    const user = await fetch('http://localhost:3000/api/user');
    return user.json();
  }
  const error = new Error(`Error ${res.status}`);
  return Promise.reject(error);
};

export { getUserById, verifyLogin };
