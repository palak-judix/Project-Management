export const API_URL = "http://localhost:5000/api";

export async function loginUser(data: any) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include", // IMPORTANT
    body: JSON.stringify(data)
  });

  return res.json();
}
