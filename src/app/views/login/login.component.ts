import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../service/login.service';


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

  constructor(private loginService: LoginService,
              private router: Router) {
  }

  ngOnInit() {
    this.checkIfLoginAlready();
  }

  onclickSubmit() {
    this.submitted = true;
    // send data to api to login
    this.startLoading();
    this.loginService.login(this.loginName, this.password).subscribe(credentialData => {
      if (credentialData !== null && credentialData.token && credentialData.token.length) {
        // this.authService.saveCredentialData(credentialData);
        this.router.navigate(['dashboard']);
      } else {
        this.showLoginError = true;
      }

      this.completeLoading();
    });
  }

  private checkIfLoginAlready() {
    // const isAuthenticated = this.authService.isAuthenticated();
    // if (isAuthenticated) {
    //   this.router.navigate([RouteConstant.HOME]);
    // }
  }

  startLoading() {
    // this.progress.start();
  }

  completeLoading() {
    // this.progress.complete();
  }
}
