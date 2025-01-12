import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserProperties} from '../navbar/profile/IUserProperties';

@Injectable({
  providedIn: 'root'
})
export class UserPropertiesService {
  private apiUrl: string = 'http://localhost:9090/chessland/account';

  constructor(private http: HttpClient) {}

  getUserProperties(): Observable<UserProperties> {
    return this.http.get<UserProperties>(`${this.apiUrl}/user-properties`);
  }
}
