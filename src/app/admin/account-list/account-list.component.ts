import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Restangular} from 'ngx-restangular';
@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {

  loadingIndicator = false;
  rows: any[] = [];
  columns = [
    {name: 'username'},
    {name: 'email'},
    {name: 'role'}
  ];
  currentPage: 1;
  itemPerPage: 10;

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
    this.loadingIndicator = true;
    // First way of creating a this.restangular object. Just saying the base URL
    const baseAccounts = this.restangular.all('users');
    // This will query /accounts and return a observable.
    baseAccounts.getList().subscribe(accounts => {
      this.rows = accounts.plain();
      console.log(this.rows);
      this.loadingIndicator = false;
    });
  }
}
