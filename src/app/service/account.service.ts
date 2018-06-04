import {Injectable} from '@angular/core';
import {MyHttpUtil} from '../util/MyHttpUtil';
import {catchError, tap} from 'rxjs/internal/operators';
import {ApiUrlConstant} from '../constant/ApiUrlConstant';
import {Observable} from 'rxjs/index';
import {HttpClient} from '@angular/common/http';
import {PagingData} from '../entity/PagingData';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) {
  }

  getListAccount(page: number, pageSize: number): Observable<PagingData<Account>> {
    const url = ApiUrlConstant.BASE_URL + ApiUrlConstant.ACCOUNT_GET_LIST_URL;
    return this.http.post<PagingData<Account>>(url, {'page': page, 'pageSize': pageSize})
        .pipe(
            tap(_ => console.log()
            ),
            catchError(MyHttpUtil.handleError<PagingData<Account>>('Get account'))
        );
  }

  saveAccount(account: Account): Observable<boolean> {
    const url = ApiUrlConstant.BASE_URL + ApiUrlConstant.ACCOUNT_SAVE_URL;

    return this.http.post<boolean>(url, account)
        .pipe(
            tap(() => console.log('found roles')
            ),
            catchError(MyHttpUtil.handleError<boolean>('save account'))
        );
  }

  deleteAccount(account: Account): Observable<boolean> {
    const url = ApiUrlConstant.BASE_URL + ApiUrlConstant.ACCOUNT_DELETE_URL;

    return this.http.post<boolean>(url, account.id)
        .pipe(
            tap(() => console.log('delete account success')
            ),
            catchError(MyHttpUtil.handleError<boolean>('delete account'))
        );
  }
}
