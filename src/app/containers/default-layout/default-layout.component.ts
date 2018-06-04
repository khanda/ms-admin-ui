import {Component} from '@angular/core';
import {navItems} from './../../_nav';
import {AuthService} from '../../service/auth/auth.service';
import {NgProgress} from '@ngx-progressbar/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;

  constructor(private auth: AuthService,
              private http: HttpClient,
              public progress: NgProgress) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });
  }

  logout() {
    this.auth.logout();
  }

}
