import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AccountManagementComponent} from './account-management/account-management.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Admin'
    },
    children: [
      {
        path: 'users',
        component: AccountManagementComponent,
        data: {
          title: 'users'
        }
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
