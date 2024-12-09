import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {map, Observable, Subscriber, switchMap, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

type ProfilePicture = { profilePicture: number[], imageType: string };

@Injectable({
  providedIn: 'root',
})
export class ProfilePictureService {
  private apiUrl = 'http://localhost:9090/chessland/account';

  constructor(private http: HttpClient) {}

  uploadProfilePicture(picture: File): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/octet-stream' });

    return new Observable<Uint8Array>((observer: Subscriber<Uint8Array>) => {
      const reader = new FileReader();

      reader.onload = () => {
        observer.next(new Uint8Array(reader.result as ArrayBuffer));
        observer.complete();
      };

      reader.onerror = (error) => {
        observer.error(error);
      };

      reader.readAsArrayBuffer(picture);
    }).pipe(
      switchMap((byteArray) => this.http.put(`${this.apiUrl}/put-profile-picture`, byteArray, { headers })),
      catchError(this.handleError)
    );
  }

  getProfilePicture(): Observable<any> {
    return this.http
      .get<ProfilePicture>(`${this.apiUrl}/profile-picture`)
      .pipe(
        map((response: ProfilePicture) => {
          const byteArray = new Uint8Array(response.profilePicture);
          const blob = new Blob([byteArray], { type: response.imageType });
          const file = new File([blob], `profile-picture.${response.imageType}`, { type: response.imageType });

          return URL.createObjectURL(file);
        }),
        catchError(this.handleError)
      );
  }

  deleteProfilePicture(): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/delete-profile-picture`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
