import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountManagementComponent} from './account-management/account-management.component';
import {AdminRoutingModule} from './admin-routing.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountBuilderComponent } from './account-builder/account-builder.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxDatatableModule
  ],
  declarations: [
      AccountManagementComponent,
      AccountListComponent,
      AccountBuilderComponent
  ]
})
export class AdminModule {
}
