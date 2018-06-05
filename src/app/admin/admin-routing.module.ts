import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AccountListComponent} from "./account-list/account-list.component";
import {AccountBuilderComponent} from "./account-builder/account-builder.component";
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Admin'
    },
    children: [
      {
        path: 'user',
        children: [
          {
            path: 'list',
            component: AccountListComponent,
            data: {
              title: 'Users'
            }
          },
          {
            path: 'builder',
            component: AccountBuilderComponent,
            data: {
              title: 'Add or Edit User'
            }
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
