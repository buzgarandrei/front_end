import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'booking-ui';
  navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  isAdmin() {
    const role = localStorage.getItem('role');
    if (role == null) {
      return false;
    }
    console.log(role);
    if (role === 'ADMIN') {
      return true;
    }
    return false;
  }

  isOwner() {
    const role = localStorage.getItem('role');
    if (role == null) {
      return false;
    }
    if (role === 'OWNER') {
      return true;
    }
    return false;
  }

  isUser() {
    const role = localStorage.getItem('role');
    if (role == null) {
      return false;
    }
    if (role === 'BASIC_USER' || role === 'PREMIUM_USER') {
      return true;
    }
    return false;
  }
}
