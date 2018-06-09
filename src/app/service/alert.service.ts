import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private translate: TranslateService) {
  }

  getModuleName(module: string) {
    return this.translate.get(module).subscribe((res: string) => {
      console.log(res);
      return res;
    });
  }

  getMessage(statusCode: number) {
    switch (statusCode) {
      case 422:
        return 'common_message.duplicate';
    }
  }
}
