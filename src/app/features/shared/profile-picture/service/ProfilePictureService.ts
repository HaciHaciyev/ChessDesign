import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {map, Observable, Subscriber, switchMap, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

interface ProfilePicture {
  profilePicture: Uint8Array;
  imageType: string;
}

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

      reader.onerror = (error: ProgressEvent<FileReader>) => {
        observer.error(error);
      };

      reader.readAsArrayBuffer(picture);
    }).pipe(
      switchMap((byteArray: Uint8Array) => this.http.put(`${this.apiUrl}/put-profile-picture`, byteArray, { headers })),
      catchError(this.handleError)
    );
  }

  getProfilePicture(): Observable<any> {
    return this.http
      .get<ProfilePicture>(`${this.apiUrl}/profile-picture`)
      .pipe(
        map((response: ProfilePicture) => {
          return `data:${response.imageType};base64,${response.profilePicture}`
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
    let errorMessage: string = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
