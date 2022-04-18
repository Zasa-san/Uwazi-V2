const getUserById = (id: string) => ({ email: 'abc', id });

const verifyLogin = async (email: string, password: string) =>
  email && password
    ? Promise.resolve({ id: 'user1', email: 'email1' })
    : Promise.reject(new Error('Invalid credentials'));

export { getUserById, verifyLogin };
