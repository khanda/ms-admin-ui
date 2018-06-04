import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountManagementComponent} from './account-management/account-management.component';
import {AdminRoutingModule} from './admin-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [
      AccountManagementComponent
  ]
})
export class AdminModule {
}
