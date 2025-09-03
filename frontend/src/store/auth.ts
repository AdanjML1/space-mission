export function setSession(token: string) {
  localStorage.setItem('token', token);
}
export function clearSession() {
  localStorage.removeItem('token');
}
export function isAuthed() {
  return !!localStorage.getItem('token');
}
