/**
 * Created by quyen on 03/02/2018.
 */
import {Injectable} from '@angular/core';
import {CredentialConstant} from '../../constant/CredentialConstant';
import {CredentialData} from '../../entity/CredentialData';
import {HttpRequest} from '@angular/common/http';
import {Observable, of} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  // store the URL so we can redirect after logging in
  redirectUrl: string;
  cachedRequests: Array<HttpRequest<any>> = [];

  login(): Observable<boolean> {
    const token = localStorage.getItem(CredentialConstant.TOKEN);
    if (token && token.length) {
      this.isLoggedIn = true;
    }
    return of(this.isLoggedIn);
  }

  logout(): void {
    localStorage.clear();
    this.isLoggedIn = false;
  }

  public getToken(): string {
    return localStorage.getItem(CredentialConstant.TOKEN);
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    if (token && token.length) {
      this.isLoggedIn = true;
      return true;
    }
    return false;
  }

  public isAdmin() {
    return this.isAuthenticated && CredentialConstant.HBT_SUPER_ADMIN === localStorage.getItem(CredentialConstant.ROLE);
  }

  public getCredentialData(): CredentialData {
    const credentialData = new CredentialData();
    credentialData.token = localStorage.getItem(CredentialConstant.TOKEN);
    credentialData.id = +localStorage.getItem(CredentialConstant.ID);
    credentialData.userName = localStorage.getItem(CredentialConstant.USERNAME);
    credentialData.role = localStorage.getItem(CredentialConstant.ROLE);
    credentialData.roleDescription = localStorage.getItem(CredentialConstant.ROLE_DESCRIPTION);

    return credentialData;
  }

  public saveCredentialData(credentialData: CredentialData) {
    localStorage.setItem(CredentialConstant.TOKEN, credentialData.token);
    localStorage.setItem(CredentialConstant.ID, credentialData.id + '');
    localStorage.setItem(CredentialConstant.USERNAME, credentialData.userName);
    localStorage.setItem(CredentialConstant.ROLE, credentialData.role);
    localStorage.setItem(CredentialConstant.ROLE_DESCRIPTION, credentialData.roleDescription);
    console.log('save credential data');
  }

  public collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }

  public retryFailedRequests(): void {
    // retry the requests. this method can
    // be called after the token is refreshed
  }
}
