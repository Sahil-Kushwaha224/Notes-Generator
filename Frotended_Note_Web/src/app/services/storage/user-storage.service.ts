import { Injectable } from '@angular/core';

const TOKEN = 't_token';
const USER = 't_user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  
  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  static hasToken(): boolean {
    if ( this.getToken() === null){
      return false;
    }
    return true;
  }

  static getToken(): string {
    return localStorage.getItem(TOKEN);
  }

  public saveUser(user): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  static getUser(): any {
    return JSON.parse(localStorage.getItem(USER));
  }


  static getUserId(): string {
    const user = this.getUser();
    if ( user == null){ return ''; }
    return user.userId;
  }



  static isUserLoggedIn(): boolean {
    if ( this.getToken() === null){
      return false;
    }
    
    return true;
  }

 
  static tokenExpired() {
    const expiry = (JSON.parse(atob(this.getToken().split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }


  static signOut(): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }

  
}
