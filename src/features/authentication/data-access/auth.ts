import { Auth } from '../models/auth';

export const loginUser = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<Auth> => {
  const response = await fetch('https://dummyjson.com/user/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    throw new Error('Login failed');
  }
  const data = await response.json();
  return data;
};
