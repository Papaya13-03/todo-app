export function getToken() {
  return localStorage.getItem("token");
}

export function saveToken(token) {
  localStorage.setItem("token", token);
}

export function deleteToken(token) {
  localStorage.removeItem("token");
}
