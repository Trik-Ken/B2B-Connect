const API_URL = 'http://localhost:5000/api';

export async function signup({ email, companyName, password }) {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, companyName, password }),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Signup failed');
  return res.json();
}

export async function login({ email, password }) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Login failed');
  return res.json();
}