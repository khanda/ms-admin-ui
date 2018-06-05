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
  timeout: any;

  currentPage: 1;
  itemPerPage: 10;
  constructor(private restangular: Restangular,
              private router: Router) {
  }

  //
  // pageChanged(event: any): void {
  //   this.currentPage = event.page;
  //   this.getListAccount(this.currentPage, this.itemPerPage);
  // }

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
