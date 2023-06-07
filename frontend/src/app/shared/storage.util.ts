export function setLocalStorageItem(key: string, value: unknown): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorageItem(key: string): any {
  const item = localStorage.getItem(key);
  return item && JSON.parse(item);
}

export function removeLocalStorageItem(key: string) {
  localStorage.removeItem(key);
}

export function removeLocalStorageAll() {
  localStorage.clear();
}
