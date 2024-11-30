import { Injectable } from '@angular/core';

export enum StorageType {
  JWT_TOKEN = 'JWTToken',
  REFRESH_TOKEN = 'REFRESH_TOKEN'
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  set(key: StorageType, value: string): void {
    localStorage.setItem(key, value);
  }

  get<T>(key: StorageType): string | null {
    return localStorage.getItem(key);
  }

  remove(key: StorageType): void {
    localStorage.removeItem(key);
  }
}
