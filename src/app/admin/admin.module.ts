import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AccountManagementComponent} from "./account-management/account-management.component";
import {AdminRoutingModule} from "./admin-routing.module";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {AccountListComponent} from "./account-list/account-list.component";
import {AccountBuilderComponent} from "./account-builder/account-builder.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {BsDropdownModule} from "ngx-bootstrap";
import {DropdownsComponent} from "../views/buttons/dropdowns.component";
import {AgGridModule} from "ag-grid-angular";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    NgxDatatableModule,
    TranslateModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    AgGridModule.withComponents([])
  ],
  declarations: [
    AccountManagementComponent,
    AccountListComponent,
    AccountBuilderComponent,
    DropdownsComponent
  ]
})
export class AdminModule {
}
