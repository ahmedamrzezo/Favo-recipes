import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

interface AuthenticationResponseDate {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  signUpUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser';
  loginUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword';
  apiKey = environment.firebaseAPIKey;

  user = new BehaviorSubject<User>(null);

  private tokenExpirationTimer: any;
 
  constructor(private http$: HttpClient, private router: Router) { }
  
  formSignUpFields = [
    {
      name: 'name',
      type: 'name',

    },
    {
      name: 'email',
      type: 'email',

    },
    {
      name: 'password',
      type: 'password',

    },
  ];
  
  formLoginFields = [
    {
      name: 'email',
      type: 'email',

    },
    {
      name: 'password',
      type: 'password',

    },
  ];

  getFormSignUpFields() {
    return this.formSignUpFields;
  }
  getLoginFields() {
    return this.formLoginFields;
  }

  signUp(credential: {
    name: string,
    email: string,
    password: string,
  }) {
    return this.http$
    .post<AuthenticationResponseDate>(
      this.signUpUrl,
      {
        email: credential.email,
        password: credential.password,
        returnSecureToken: true
      },
      {
        params: { 'key': this.apiKey }
      }
    )
    .pipe(
      catchError(this.handleError), 
      tap(
        resData => {
          this.handleAuth(
            resData.localId,
            resData.email,
            resData.idToken,
            +resData.expiresIn
          );
        }
      )
    )
  }

  login(credential: {
    email: string,
    password: string,
  }) {
    return this.http$
    .post<AuthenticationResponseDate>(
      this.loginUrl,
      {
        email: credential.email,
        password: credential.password,
        returnSecureToken: true
      },
      {
        params: { 'key': this.apiKey }
      }
    )
    .pipe(
      catchError(this.handleError), 
      tap(
        resData => {
          this.handleAuth(
            resData.localId,
            resData.email,
            resData.idToken,
            +resData.expiresIn
          );
        }
      )
    )
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const savedUser = new User(
      userData.id, 
      userData.email, 
      userData._token, 
      new Date(userData._tokenExpireDate)
      )

    if (savedUser.token) {
      this.user.next(savedUser);
      const expirationDuration = 
      new Date(userData._tokenExpireDate).getTime() - 
      new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');

    if ( this.tokenExpirationTimer ) {
      clearTimeout(this.tokenExpirationTimer);
    }
  }

  autoLogout(expirationDuration: number) {
    console.log(expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
 
  private handleAuth(id: string, email: string, token: string, expiresIn: number ) {
    const expireDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(
      id, 
      email, 
      token, 
      expireDate );

    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'there is an error happened, please try again';

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorRes);
    }
    console.log(errorRes.error.error.message);
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This Email is already registered';
        break;
        
      case 'EMAIL_NOT_FOUND':

        errorMessage = `You are not registered, please try to register.`;
        break;

      case 'INVALID_PASSWORD':
        errorMessage = `Oops, Your password looks wrong.`;
        break;

      case 'USER_DISABLED':
        errorMessage = `Sorry, you have been suspended`;
        break;
    }
    
    return throwError(errorMessage);
  }
  
}
