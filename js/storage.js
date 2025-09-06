export default class Storage {
  constructor(key) {
    this._key = key;
  }

  save(data) {
    localStorage.setItem(this._key, JSON.stringify(data));
  }

  load() {
    const data = localStorage.getItem(this._key);
    return data ? JSON.parse(data) : {};
  }

  clear() {
    localStorage.removeItem(this._key);
  }
}
