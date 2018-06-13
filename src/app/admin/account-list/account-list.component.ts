import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Restangular} from 'ngx-restangular';
import {AgGridNg2} from 'ag-grid-angular';
@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit, AfterViewInit {
  @ViewChild('agGrid') agGrid: AgGridNg2;

  columnDefs = [
    {headerName: 'Id', field: 'id', checkboxSelection: true},
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

  ngAfterViewInit() {
    console.log(this.agGrid); // 👶 I am a child!
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

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    console.log(selectedData);
    // const selectedDataStringPresentation = selectedData.map(node => node.make + ' ' + node.model).join(', ');
    // alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }
}
