import {Component, OnInit} from '@angular/core';
import {MessageConstant} from '../../constant/MessageConstant';
import {Account} from '../../entity/Account';
import {MyConstant} from '../../constant/MyConstant';
import {Router} from '@angular/router';
import {Restangular} from 'ngx-restangular';
import {AuthService} from "../../service/auth/auth.service";

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.scss']
})
export class AccountManagementComponent implements OnInit {
  public options = {
    position: [MessageConstant.VERTICAL_POSITION, MessageConstant.HORIZONTAL_POSITION],
    timeOut: MessageConstant.TIMEOUT,
    lastOnBottom: true
  };
  // pagination
  currentPage = 1;
  itemPerPage = MyConstant.ITEM_PER_PAGE;
  total = 0;
  numPages = 0;
  pages: number[] = [];

  listAccount: Account[] = [];
  selectedAccount: Account = new Account();

  constructor(private restangular: Restangular,
              private router: Router) {
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.getListAccount(this.currentPage, this.itemPerPage);
  }

  ngOnInit() {
    this.getListAccount(this.currentPage, this.itemPerPage);
  }

  getListAccount(page: number, pageSize: number) {
    // First way of creating a this.restangular object. Just saying the base URL
    const baseAccounts = this.restangular.all('users');
    // This will query /accounts and return a observable.
    baseAccounts.getList().subscribe(accounts => {
      console.log(accounts);
    });
  }

  onClickAdd() {

  }

  onClickDelete(index: number) {
  }

  showAlertMessage(content: string, type: string, title: string) {

  }
}
