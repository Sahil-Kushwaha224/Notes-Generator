import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserStorageService } from '../storage/user-storage.service';

const BASIC_URL = 'http://localhost:9192/';
export const AUTH_HEADER = 'authorization';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  
  constructor(
    private http: HttpClient,
    private userStorageService: UserStorageService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }


  createNote(data: any): Observable<any> {
    data.userId = UserStorageService.getUserId();
    return this.http.post(BASIC_URL + "api/notes", data, {
      headers: this.createAuthorizationHeader()
    });
  }

  getLatestNotesForUser(): Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http.get(BASIC_URL + `api/notes/latest/${userId}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  private createAuthorizationHeader(): HttpHeaders {
    if (UserStorageService.tokenExpired()) {
      console.log("Token expired");
      this.snackBar.open("Token expired, Login again.", 'Close', {
        duration: 5000,
        panelClass: 'error-snackbar'
      });
      UserStorageService.signOut();
      this.router.navigateByUrl('login');
    }
    return new HttpHeaders().set(
      'Authorization',
      'Bearer ' + UserStorageService.getToken()
    );
  }
}
