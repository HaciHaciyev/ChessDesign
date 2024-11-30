import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ILogin} from '../login/ILogin';
import {IRegistration} from '../registration/IRegistration';
import {Observable} from 'rxjs';

export interface ILoginResponse {
  token: string;
  refreshToken: string;
}

export type LoginResponse = ILoginResponse | string;

@Injectable({
  providedIn: 'root'
})
export class EntranceService {
  private readonly url: string = "http://localhost:9090/chessland/account";

  constructor(private http: HttpClient) {}

  login(formData: ILogin): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.url}/login`, formData);
  }

  registration(formData: IRegistration): Observable<string> {
    return this.http.post(`${this.url}/registration`, formData, {responseType: "text"});
  }
}
