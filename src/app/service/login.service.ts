import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CredentialData} from '../entity/CredentialData';
import {catchError, map} from 'rxjs/internal/operators';
import {ApiUrlConstant} from '../constant/ApiUrlConstant';
import {Observable} from 'rxjs/index';
import {MyHttpUtil} from '../util/MyHttpUtil';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  login(userName: string, password: string): Observable<CredentialData> {
    const url = ApiUrlConstant.BASE_URL + ApiUrlConstant.LOGIN_URL;
    return this.http.post<CredentialData>(url, {'email': userName, 'password': password})
        .pipe(
            map(response => {
              console.log(response);
              return response;
            }),
            catchError(MyHttpUtil.handleError<CredentialData>('login', new CredentialData()))
        );
  }
}
