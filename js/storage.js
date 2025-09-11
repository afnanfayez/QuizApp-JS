export default class Storage {
  constructor(storageKey = "quizApp") {
    this._storageKey = storageKey;
  }

  save(data) {
    try {
      const serializedData = JSON.stringify(data);
      localStorage.setItem(this._storageKey, serializedData);
      return true;
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      return false;
    }
  
  }

  load() {
    try {
      const serializedData = localStorage.getItem(this._storageKey);
      if (serializedData === null) {
        return null;
      }
      return JSON.parse(serializedData);
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      return null;
    }
  }

  clear() {
    try {
      localStorage.removeItem(this._storageKey);
      return true;
    } catch (error) {
      console.error("Error clearing localStorage:", error);
      return false;
    }
  }

  exists() {
    try {
      return localStorage.getItem(this._storageKey) !== null;
    } catch (error) {
      console.error("Error checking localStorage:", error);
      return false;
    }
  }
}