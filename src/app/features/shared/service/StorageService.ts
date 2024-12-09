import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export enum StorageType {
  JWT_TOKEN = 'JWTToken',
  REFRESH_TOKEN = 'REFRESH_TOKEN'
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(localStorage.getItem(StorageType.JWT_TOKEN));

  constructor() {}

  set(key: StorageType, value: string): void {
    localStorage.setItem(key, value);
    this.tokenSubject.next(value);
  }

  get<T>(key: StorageType): string | null {
    return localStorage.getItem(key);
  }

  remove(key: StorageType): void {
    localStorage.removeItem(key);
    this.tokenSubject.next(null);
  }

  getTokenObservable() {
    return this.tokenSubject.asObservable();
  }
}
