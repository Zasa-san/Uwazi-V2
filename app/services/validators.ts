const validateEmail = (email: unknown): email is string =>
  typeof email === 'string' && email.length > 3 && email.includes('@');

export { validateEmail };
