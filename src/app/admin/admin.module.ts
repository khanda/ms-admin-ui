import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountManagementComponent} from './account-management/account-management.component';
import {AdminRoutingModule} from './admin-routing.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {AccountListComponent} from './account-list/account-list.component';
import {AccountBuilderComponent} from './account-builder/account-builder.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    NgxDatatableModule,
    TranslateModule
  ],
  declarations: [
    AccountManagementComponent,
    AccountListComponent,
    AccountBuilderComponent
  ]
})
export class AdminModule {
}
