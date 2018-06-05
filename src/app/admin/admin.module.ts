import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountManagementComponent} from './account-management/account-management.component';
import {AdminRoutingModule} from './admin-routing.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxDatatableModule
  ],
  declarations: [
      AccountManagementComponent
  ]
})
export class AdminModule {
}
