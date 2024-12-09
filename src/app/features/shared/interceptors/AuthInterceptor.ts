import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {inject} from '@angular/core';
import {catchError, switchMap, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {AuthService, ILoginResponse, LoginResponse} from '../service/AuthService';
import {StorageService, StorageType} from '../service/StorageService';

export const authInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn) => {
  const entranceService: AuthService = inject(AuthService);
  const storage: StorageService = inject(StorageService);
  const router: Router = inject(Router);

  const token: string | null = storage.get(StorageType.JWT_TOKEN);
  const clonedRequest: HttpRequest<any> = token !== null ? request.clone({setHeaders: {Authorization: `Bearer ${token}`}}) : request;

  return next(clonedRequest).pipe(
    catchError((error: any) => {
      if (error.status === 401 || error.status === 403) {
        return handle401Error(request, next, entranceService, storage, router);
      }
      return throwError(() => error);
    })
  );
};

function handle401Error(request: HttpRequest<any>,
                        next: HttpHandlerFn,
                        authService: AuthService,
                        storage: StorageService,
                        router: Router) {

  const refreshToken: string | null = storage.get(StorageType.REFRESH_TOKEN);
  if (refreshToken === null || refreshToken === undefined) {
    router.navigate(['/entrance']).then();
    return throwError(() => new Error('Refresh token is missing'));
  }

  return authService
    .refresh(refreshToken)
    .pipe(
      switchMap((newTokens: LoginResponse) => {
        if (isLoginResponse(newTokens)) {
          console.log(`AuthInterceptor: handle401Error. Token ${newTokens.token}`)
          console.log(`AuthInterceptor: handle401Error. Refresh token ${newTokens.refreshToken}`)

          storage.set(StorageType.JWT_TOKEN, newTokens.token);
          storage.set(StorageType.REFRESH_TOKEN, newTokens.refreshToken);

          const clonedRequest = request.clone({
            setHeaders: {Authorization: `Bearer ${newTokens.token}`},
          });

          return next(clonedRequest);
        }

        throw new Error('Unexpected response.');
      }),
      catchError(() => {
        storage.remove(StorageType.JWT_TOKEN);
        storage.remove(StorageType.REFRESH_TOKEN);

        router.navigate(['/entrance']).then();

        return throwError(() => new Error('Refresh token expired'));
      })
  );
}

function isLoginResponse(response: LoginResponse): response is ILoginResponse {
  return (response as ILoginResponse).token !== undefined;
}
