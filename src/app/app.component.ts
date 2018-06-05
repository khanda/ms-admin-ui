import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {MyConstant} from './constant/MyConstant';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  language: string;

  constructor(private router: Router,
              private translate: TranslateService) {
    this.language = MyConstant.DEFAULT_LANGUAGE;
    translate.setDefaultLang(this.language);
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('vi');
    localStorage.setItem(MyConstant.LANGUAGE, this.language);
    console.log(translate);
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  switchLanguage(language: string) {
    this.language = language;
    this.translate.use(this.language);
    localStorage.setItem(MyConstant.LANGUAGE, this.language);
  }
}
