import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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

  actions = {
    enableEdit: false,
  };

  constructor(private restangular: Restangular,
              private router: Router,
              private route:  ActivatedRoute
  ) {
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

  goToEdit() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    console.log(selectedData);
    if (!selectedData[0]) {
      return;
    }
    const id = selectedData[0].id;
    this.router.navigate(['/admin/user/builder'], id);
  }

  onRowSelected(event) {
    console.log('row ' + event.node.data.email + ' selected = ' + event.node.selected);
    if (event.node.data.id) {
      this.actions.enableEdit = true;
    }
  }

}
