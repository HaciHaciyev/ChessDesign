import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {map, Observable, of, tap, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

interface ProfilePicture {
  profilePicture: Uint8Array;
  imageType: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProfilePictureService {
  private apiUrl: string = 'http://localhost:9090/chessland/account';

  constructor(private http: HttpClient) {}

  uploadProfilePicture(file: File): Observable<boolean> {
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/octet-stream',
      }),
    };

    return this.http.put(`${this.apiUrl}/put-profile-picture`, file!, headers)
      .pipe(
        tap((): void => console.log("Upload image successful")),
        map((): boolean => true),
        catchError((error: any): Observable<boolean> => {
          console.error("Error when trying to upload image.", error);
          return of(false)
        })
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

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage: string = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError((): Error => new Error(errorMessage));
  }
}
