import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../service/login.service';
import {RouteConstant} from '../../constant/RouteConstant';
import {AuthService} from '../../service/auth/auth.service';
import {NgProgress} from '@ngx-progressbar/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  loginName: string;
  password: string;
  submitted = false;
  // message
  showLoginError = false;
  loading = false;

  constructor(private loginService: LoginService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.checkIfLoginAlready();
  }

  onclickSubmit() {
    this.submitted = true;
    // send data to api to login
    this.loading = true;
    this.loginService.login(this.loginName, this.password).subscribe(credentialData => {
      if (credentialData !== null && credentialData.token && credentialData.token.length) {
        this.authService.saveCredentialData(credentialData);
        this.router.navigate([RouteConstant.NONE]);
      } else {
        this.showLoginError = true;
      }
      this.loading = false;
    });
  }

  private checkIfLoginAlready() {
    const isAuthenticated = this.authService.isAuthenticated();
    if (isAuthenticated) {
      this.router.navigate([RouteConstant.NONE]);
    }
  }
}
