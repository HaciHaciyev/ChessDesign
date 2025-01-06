import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ILogin} from '../../entrance/login/ILogin';
import {IRegistration} from '../../entrance/registration/IRegistration';
import {Observable} from 'rxjs';
import {StorageService, StorageType} from './StorageService';
import {Router} from '@angular/router';

export interface ILoginResponse {
  token: string;
  refreshToken: string;
}

export type LoginResponse = ILoginResponse | string;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly url: string = "http://localhost:9090/chessland/account";

  constructor(private http: HttpClient,
              private storage: StorageService,
              private router: Router) {}

  login(formData: ILogin): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.url}/login`, formData);
  }

  registration(formData: IRegistration): Observable<string> {
    return this.http.post(`${this.url}/registration`, formData, {responseType: "text"});
  }

  refresh(refreshToken: string): Observable<LoginResponse> {
    const headers = new HttpHeaders({
      "Refresh-Token": refreshToken
    });
    return this.http.post<LoginResponse>(`${this.url}/refresh-token`, {}, {headers});
  }

  handleLogout(): void {
    this.storage.remove(StorageType.JWT_TOKEN);
    this.storage.remove(StorageType.REFRESH_TOKEN);

    this.router.navigate(['/entrance']).then();
  }
}
