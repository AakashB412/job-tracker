const BASE = import.meta.env.VITE_API_URL;
export async function api<T>(path: string, options: RequestInit = {}) {
const res = await fetch(`${BASE}${path}`, {
...options,
headers: {
'Content-Type': 'application/json',
Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
...(options.headers || {})
}
});
if (!res.ok) throw new Error(await res.text());
return res.json() as Promise<T>;
}
