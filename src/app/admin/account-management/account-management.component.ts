import {Component, OnInit} from '@angular/core';
import {MessageConstant} from '../../constant/MessageConstant';
import {Account} from '../../entity/Account';
import {MyConstant} from '../../constant/MyConstant';
import {Router} from '@angular/router';
import {Restangular} from 'ngx-restangular';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.scss']
})
export class AccountManagementComponent implements OnInit {
  rows;
  expanded = {};
  timeout: any;

  listAccount: Account[] = [];
  selectedAccount: Account = new Account();

  constructor(private restangular: Restangular,
              private router: Router) {
    this.fetch((data) => {
      this.rows = data;
    });
  }

  //
  // pageChanged(event: any): void {
  //   this.currentPage = event.page;
  //   this.getListAccount(this.currentPage, this.itemPerPage);
  // }

  ngOnInit() {
    // this.getListAccount(this.currentPage, this.itemPerPage);
  }

  getListAccount(page: number, pageSize: number) {
    // First way of creating a this.restangular object. Just saying the base URL
    const baseAccounts = this.restangular.all('users');
    // This will query /accounts and return a observable.
    baseAccounts.getList().subscribe(accounts => {
      console.log(accounts);
    });
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/100k.json`);

    req.onload = () => {
      const rows = JSON.parse(req.response);

      for (const row of rows) {
        row.height = Math.floor(Math.random() * 80) + 50;
      }
      cb(rows);
    };

    req.send();
  }

  getRowHeight(row) {
    return row.height;
  }
}
