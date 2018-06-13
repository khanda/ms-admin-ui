import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Restangular} from 'ngx-restangular';
@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {
  columnDefs = [
    {headerName: 'Username', field: 'username'},
    {headerName: 'Email', field: 'email'},
    {headerName: 'Role', field: 'role'}
  ];
  rows: any;
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
    const baseAccounts = this.restangular.all('users');
    baseAccounts.getList().subscribe(accounts => {
      this.rows = accounts.plain();
      console.log(this.rows);
    });
  }
}
