export function getOnlyId() {
  return Date.now() + Math.random().toString(32).substring(2, 6);
}
