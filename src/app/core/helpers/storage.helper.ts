export class StorageHelper {
  getAll() {
    return localStorage;
  }

  public get(key: string, parseAsJSON?: boolean): any {
    const data = localStorage.getItem(key) as any;
    if (parseAsJSON && this.isValidJSONString(data)) {
      return JSON.parse(data);
    }
    return data;
  }

  public set(key: string, data: any, jsonStringify?: boolean): void {
    if (jsonStringify) {
      data = JSON.stringify(data);
    }
    localStorage.setItem(key, data);
  }

  public remove(key: string): void {
    localStorage.removeItem(key);
  }

  public clearAll(): void {
    localStorage.clear();
  }

  public check(key: string): boolean {
    if (this.get(key) === null) {
      return false;
    }
    return true;
  }

  public isValidJSONString(str: string) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
}
