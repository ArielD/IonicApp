import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../shared/models/user.model';
import { AuthenticationService } from '../shared/services/authentication.service';
import { environment } from 'src/environments/environment';
import { Role } from '../shared/enums/role.enum';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public apiURL = environment.apiTest;
  public currentUser: UserModel;
  public isAdmin: boolean = false;
  
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
    this.authenticationService.getCurrentUser().subscribe((x) => {
      this.currentUser = x;
      if (this.currentUser.role == Role.Admin) {
        this.isAdmin = true;
      }
      this.authenticationService.setCurrentUser(this.currentUser)
    });
  }

  ngOnInit() {

  }

  navigateToAdminPanel() {
    this.router.navigate(['admin']);
  }

  signOut() {
    localStorage.removeItem('token');
    this.router.navigate(['auth/signin']);
  }
}
