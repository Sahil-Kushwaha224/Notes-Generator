import { Component } from '@angular/core';
import { UserStorageService } from './services/storage/user-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'notesWeb';

  isUserLoggedIn: boolean = UserStorageService.isUserLoggedIn();

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
        this.isUserLoggedIn = UserStorageService.isUserLoggedIn();
      }
    })
  }

  logout() {
    UserStorageService.signOut();
    this.router.navigateByUrl('login');
  }
}
