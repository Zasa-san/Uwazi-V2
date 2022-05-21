const uwaziAPIUrl = 'http://localhost:3000/api/';

const post = async (endpoint: string, data: any, request?: Request) => {
  const url = `${uwaziAPIUrl}${endpoint}`;
  const headers = new Headers();
  headers.append('X-Requested-With', 'XMLHttpRequest');
  headers.append('content-type', 'application/json');
  if (request && request.headers.has('cookie')) {
    headers.append('Cookie', request.headers.get('cookie')!);
  }

  return fetch(url, {
    body: JSON.stringify(data),
    method: 'post',
    headers,
    credentials: 'same-origin',
    mode: 'cors',
  });
};

const get = async (endpoint: string, request: any) => {
  const url = `${uwaziAPIUrl}${endpoint}`;
  const headers = new Headers();
  headers.append('X-Requested-With', 'XMLHttpRequest');
  headers.append('content-type', 'application/json');
  headers.append('Cookie', request.headers.get('cookie')!);
  headers.append('set-cookie', request.headers.get('set-cookie')!);
  return fetch(url, {
    headers,
    credentials: 'include',
    mode: 'cors',
  });
};

export { post, get };
